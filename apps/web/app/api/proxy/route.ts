import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { endpoint, method = 'POST', data } = body

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const fullUrl = `${apiUrl}${endpoint}`

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    return NextResponse.json(responseData, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao chamar API' },
      { status: 500 }
    )
  }
}
