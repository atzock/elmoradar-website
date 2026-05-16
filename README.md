# elmoradar - Website

Official website for elmoradar on Twitch.

# Für Dennis
Bitte gucken in die example.env
(ist alles erklärt)


## Features

- 🎮 Real-time Twitch status monitoring
- 📊 Live stream information
- 🔍 Channel status checking

## Twitch API Integration

The site includes a Twitch API test for checking live stream status:

### Usage

```javascript
// Test the Twitch API endpoint
(async () => {
  // Check channel status
  console.group('🎮 /api/twitch/status');
  const localRes = await fetch('/api/twitch/status?channel=elmoradar');
  const localData = await localRes.json();
  console.log('Status:', localRes.status, localRes.ok ? '✅' : '❌');
  console.table(localData);
  console.groupEnd();

  // Custom channel test
  console.group('🔍 Custom channel test');
  const customChannel = 'elmoradar'; // Change this to test other channels
  const customRes = await fetch(`/api/twitch/status?channel=${customChannel}`);
  const customData = await customRes.json();
  console.log(`Channel "${customChannel}" live:`, customData.live ? '🔴 LIVE' : '⚫ Offline');
  if (customData.live) {
    console.log(`  Title: ${customData.title}`);
    console.log(`  Game: ${customData.game}`);
    console.log(`  Viewers: ${customData.viewers}`);
    console.log(`  Started: ${customData.startedAt}`);
  }
  console.log('Configured:', customData.configured, '| Error:', customData.error ?? 'none');
  console.groupEnd();
})();
```