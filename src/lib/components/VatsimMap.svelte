<script lang="ts">
	import { onMount } from "svelte";

	type VatsimPilot = {
		callsign: string;
		latitude: number;
		longitude: number;
		altitude: number;
		heading?: number;
		flight_plan?: {
			departure?: string;
			arrival?: string;
		};
	};

	type VatsimData = {
		pilots: VatsimPilot[];
	};

	type LeafletModule = typeof import("leaflet");

	let leaflet: LeafletModule;
	let map: ReturnType<LeafletModule["map"]>;
	let trafficLayer: ReturnType<LeafletModule["layerGroup"]>;

	let refreshTimer: ReturnType<typeof setInterval>;
	let loading = false;

	const REFRESH_RATE = 30000;

	function altitudeColor(alt: number) {
		if (alt < 5000) return "#22c55e";   // green
		if (alt < 20000) return "#f59e0b";  // amber
		return "#ef4444";                   // red
	}

	function createAircraftIcon(pilot: VatsimPilot) {
		return leaflet.divIcon({
			className: "aircraft-marker",
			html: `
				<div style="
					width:24px;
					height:24px;
					display:flex;
					align-items:center;
					justify-content:center;
					transform: rotate(${pilot.heading ?? 0}deg);
					filter: drop-shadow(0 0 3px rgba(0,0,0,0.6));
				">
					<svg viewBox="0 0 24 24" width="20" height="20" fill="${altitudeColor(pilot.altitude)}">
						<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-1.5V20l-2 1.5V23l4-1 4 1v-1.5L14 20v-5.5L21 16z"/>
					</svg>
				</div>
			`,
			iconSize: [24, 24],
			iconAnchor: [12, 12]
		});
	}

	function popupHTML(pilot: VatsimPilot) {
		return `
		<div style="font-family:system-ui;min-width:160px">
			<div style="font-weight:600;font-size:14px">
				${pilot.callsign}
			</div>

			<div style="font-size:13px;color:#666;margin-top:4px">
				${pilot.flight_plan?.departure ?? "??"} → ${pilot.flight_plan?.arrival ?? "??"}
			</div>

			<div style="margin-top:6px;font-size:12px">
				Altitude: <b>FL${Math.round(pilot.altitude / 100)}</b>
			</div>
		</div>
		`;
	}

	async function loadTraffic() {
		if (!trafficLayer || loading) return;
		loading = true;

		try {
			const res = await fetch("https://data.vatsim.net/v3/vatsim-data.json");
			if (!res.ok) return;

			const data = (await res.json()) as VatsimData;

			trafficLayer.clearLayers();

			data.pilots.forEach((pilot) => {
				if (!pilot.latitude || !pilot.longitude) return;

				const marker = leaflet
					.marker([pilot.latitude, pilot.longitude], {
						icon: createAircraftIcon(pilot)
					})
					.addTo(trafficLayer);

				marker.bindPopup(popupHTML(pilot));
			});
		} catch (err) {
			console.error("VATSIM traffic load failed", err);
		}

		loading = false;
	}

	onMount(() => {
		let disposed = false;

		void (async () => {
			leaflet = await import("leaflet");
			if (disposed) return;

			map = leaflet.map("vatsim-map", {
				center: [50, 10],
				zoom: 5,
				worldCopyJump: true,
				preferCanvas: true
			});

			const lightMap = leaflet.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: "abcd",
				maxZoom: 20
			});

			const darkMap = leaflet.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: "abcd",
				maxZoom: 20
			});

			const satelliteMap = leaflet.tileLayer(
				"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
				{
					attribution:
						'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
					maxZoom: 19
				}
			);

			lightMap.addTo(map);
			leaflet
				.control
				.layers(
					{
						"Light (Recommended)": lightMap,
						Dark: darkMap,
						Satellite: satelliteMap
					},
					{},
					{ collapsed: false, position: "topright" }
				)
				.addTo(map);

			trafficLayer = leaflet.layerGroup().addTo(map);

			await loadTraffic();

			refreshTimer = setInterval(loadTraffic, REFRESH_RATE);
		})();

		return () => {
			disposed = true;
			clearInterval(refreshTimer);
			map?.remove();
		};
	});
</script>

<div id="vatsim-map" class="w-full h-full rounded-xl overflow-hidden"></div>