import { ReactNode } from 'react';

export default function banner(opts: Record<string, string>): ReactNode {
  const { title, description } = opts;
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#293986',
        fontSize: 32,
        fontWeight: 600,
        color: 'white',
        background:
          'radial-gradient(#ffffff1A 15%, transparent 16%), linear-gradient(0deg, transparent 6.5%, #ffffff1A 7%, #ffffff1A 9%, transparent 10%), linear-gradient(45deg, transparent 49%, #ffffff1A 49%, #ffffff1A 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, #ffffff1A 49%, #ffffff1A 51%, transparent 51%)',
        backgroundSize: '40em 40em',
        position: 'relative',
      }}>
      <h1
        style={{
          margin: '0',
        }}>
        {title}
      </h1>
      <p
        style={{
          margin: '0',
          fontSize: '.85em',
        }}>
        {description}
      </p>
      <div
        style={{
          position: 'absolute',
          top: '0',
          height: '10%',
          width: '100%',
          backgroundColor: '#192056',
        }}></div>
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          height: '10%',
          width: '100%',
          backgroundColor: '#192056',
        }}></div>
    </div>
  );
}
