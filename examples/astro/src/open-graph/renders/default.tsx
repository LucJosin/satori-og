import type { ReactNode } from 'react';

export default function defaultRender(opts: Record<string, string>): ReactNode {
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
        background: 'linear-gradient(30deg, #0e2024, #292b3c, #0e2024)',
        fontSize: '2.3em',
        fontWeight: 600,
        color: 'white',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '100%',
          border: '2px solid #ffffff80',
          borderRadius: '30px',
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      ></div>
      <div
        style={{
          height: 'auto',
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem 0 0 ',
        }}
      >
        <h1
          style={{
            margin: '0',
            textTransform: 'uppercase',
            fontSize: '1.6em',
          }}
        >
          {title}
        </h1>
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            border: '1px solid #ffffff80',
          }}
        ></div>
        <p
          style={{
            margin: 0,
            fontSize: '0.7em',
            textAlign: 'center',
            fontWeight: 300,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
