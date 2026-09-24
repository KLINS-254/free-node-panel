import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();

    // Sends server creation request to backend
    const response = await axios.post(
      `${process.env.PTERODACTYL_URL}/api/application/servers`,
      {
        name: body.name || 'Node24-Server',
        user: 1,
        egg: 15, // Node.js Egg
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_24',
        startup: 'if [[ -d .git ]] && [[ -f package.json ]]; then npm install; fi; node {{JS_FILE}}',
        environment: {
          JS_FILE: 'index.js',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
        },
        limits: {
          memory: 308,
          swap: 0,
          disk: 716,
          io: 500,
          cpu: 25,
        },
        feature_limits: { databases: 1, allocations: 1, backups: 1 },
        allocation: { default: 1 },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PTERODACTYL_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return NextResponse.json({ success: true, server: response.data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
