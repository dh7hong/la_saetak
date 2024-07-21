import { NextRequest, NextResponse } from 'next/server';

const client_id = process.env.COIN_NAVER_CLIENT_ID;
const client_secret = process.env.COIN_NAVER_CLIENT_SECRET;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is missing' }, { status: 400 });
  }

  const api_url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURI(query)}`;
  
  const options = {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    }
  };

  try {
    const response = await fetch(api_url, options);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data }, { status: response.status });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
