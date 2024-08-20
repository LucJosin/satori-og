import { ReactNode } from 'react';

export default function render2(opts: Record<string, string>): ReactNode {
  const { title, description } = opts;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundImage:
          'linear-gradient(#99ccf93b 2px, transparent 1px), linear-gradient(to right, #99ccf93b 2px, #fff 1px)',
        backgroundSize: '50px 50px',
      }}>
      <div
        style={{
          height: '100%',
          width: '12%',
          backgroundColor: '#78b4f2',
          backgroundImage:
            'linear-gradient(135deg, #99ccf97b 25%, transparent 25%), linear-gradient(225deg, #78b4f27b 25%, transparent 25%), linear-gradient(315deg, #87baee7b 25%, transparent 25%), linear-gradient(45deg, #518ad17b 25%, #3364ac7b 25%)',
          backgroundSize: '100px 100px',
          borderRadius: '0 20px 20px 0',
        }}></div>
      <div
        style={{
          width: '70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          marginLeft: '2rem',
        }}>
        <img
          src="https://avatars.githubusercontent.com/u/94650532?s=200&v=4"
          style={{
            height: '10rem',
            width: '10rem',
            borderRadius: '40px',
          }}
        />
        <div
          style={{
            height: '100%',
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <h1 style={{ fontSize: '5em', margin: '0' }}>{title}</h1>
          <p style={{ fontSize: '2em', margin: '0' }}>{description}</p>
        </div>
      </div>
    </div>
  );
}
