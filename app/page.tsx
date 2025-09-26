'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      setMediaData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Instagram Downloader</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Instagram URL"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Download'}
            </button>
          </div>
        </form>
        
        {mediaData && (
          <div>
            <img src={mediaData.thumbnail} alt="Preview" />
            <a href={mediaData.downloadUrl} download>Download</a>
          </div>
        )}
      </div>
    </div>
  );
}