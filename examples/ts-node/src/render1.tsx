import { ReactNode } from 'react';

export default function render1(opts: Record<string, string>): ReactNode {
  const { title, description } = opts;
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#1a202c',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '40px',
        textAlign: 'center',
        backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23ffffff" fill-opacity="1" d="M0,128L48,160C96,192,192,256,288,256C384,256,480,192,576,160C672,128,768,128,864,128C960,128,1056,128,1152,160C1248,192,1344,256,1392,288L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"%3E%3C/path%3E%3C/svg%3E')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
        }}>
        <h1 style={{ fontSize: '60px', margin: '0 0 20px' }}>{title}</h1>
        <p style={{ fontSize: '30px', margin: '0' }}>{description}</p>
      </div>
    </div>
  );
}
