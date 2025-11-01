async function createRoom() {
  if (!this.newRoomName.trim()) return;
  try {
    const res = await fetch('https://matrix.org/_matrix/client/r0/createRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      },
      body: JSON.stringify({ preset: 'private_chat', name: this.newRoomName.trim() })
    });
    const data = await res.json();
    if (data.room_id) {
      this.newRoomId = data.room_id;
      await this.fetchRoomsWithNames();
      alert(`Room created: ${this.newRoomName}`);
    }
  } catch (e) {
    alert('Error creating room: ' + e.message);
  }
}

async function fetchRoomsWithNames() {
  if (!this.accessToken) return;
  try {
    const res = await fetch('https://matrix.org/_matrix/client/r0/joined_rooms', {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    });
    const data = await res.json();
    if (data.joined_rooms) {
      this.rooms = data.joined_rooms.map(roomId => ({ roomId, name: roomId })).sort((a,b)=>a.name.localeCompare(b.name));
    }
  } catch (e) {
    console.error('Fetch rooms error:', e);
  }
}
