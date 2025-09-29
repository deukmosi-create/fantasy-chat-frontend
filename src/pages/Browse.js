// src/pages/Browse.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Browse() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Using mock data for now (you can replace with real API later)
        const mockProfiles = [
          {
            id: '1',
            name: 'Aria',
            age: 26,
            city: 'New York',
            bio: 'Creative soul who loves poetry, stargazing, and deep late-night talks.',
            photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'],
            isActive: true
          },
          {
            id: '2',
            name: 'Luna',
            age: 28,
            city: 'Los Angeles',
            bio: 'Adventurous spirit seeking meaningful connection.',
            photos: ['https://images.unsplash.com/photo-1529626455594-4ff0f8a29d8a?w=300'],
            isActive: true
          },
          {
            id: '3',
            name: 'Zoe',
            age: 24,
            city: 'Miami',
            bio: 'Sunshine lover, beach walker, and dreamer.',
            photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'],
            isActive: true
          }
        ];
        setProfiles(mockProfiles);
      } catch (err) {
        console.error('Failed to load profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const startChat = (profileId) => {
    navigate(`/chat/${profileId}`);
  };

  if (loading) {
    return (
      <div className="app-container" style={{ paddingTop: '50px', textAlign: 'center' }}>
        <div className="card">Loading fantasy profiles...</div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ paddingTop: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>✨ Fantasy Profiles</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {profiles.map(profile => (
          <div
            key={profile.id}
            className="card"
            onClick={() => startChat(profile.id)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            <img
              src={profile.photos[0]}
              alt={profile.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: profile.isActive ? '2px solid #10b981' : '2px solid #ccc'
              }}
            />
            <div>
              <h3 style={{ margin: '0', color: '#333' }}>
                {profile.name}, {profile.age}
                {profile.isActive && (
                  <span style={{ marginLeft: '8px', color: '#10b981', fontSize: '14px' }}>
                    ● Online
                  </span>
                )}
              </h3>
              <p style={{ margin: '4px 0', color: '#666' }}>{profile.city}</p>
              <p style={{ margin: '4px 0', color: '#555', fontSize: '14px' }}>{profile.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}