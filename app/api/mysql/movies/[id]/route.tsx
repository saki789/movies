import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/app/sharedCode/common'; // Adjust the path as necessary

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Extract ID from URL path

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const connection = await mysql.createConnection(connectionParams);
    const [rows]: [any[], any] = await connection.execute('SELECT * FROM movies WHERE id = ?', [id]);

    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('ERROR: GET - ', (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Extract ID from URL path

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const connection = await mysql.createConnection(connectionParams);
    const [result]: [mysql.ResultSetHeader, any] = await connection.execute('DELETE FROM movies WHERE id = ?', [id]);

    await connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('ERROR: DELETE - ', (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Extract ID from URL path

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const body = await request.json();
    const { title, overview, poster_path, release_date, vote_average } = body;

    const connection = await mysql.createConnection(connectionParams);
    const [result]: [mysql.ResultSetHeader, any] = await connection.execute(
      'UPDATE movies SET title = ?, overview = ?, poster_path = ?, release_date = ?, vote_average = ? WHERE id = ?',
      [title, overview, poster_path, release_date, vote_average, id]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Movie updated successfully' });
  } catch (error) {
    console.error('ERROR: PUT - ', (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
