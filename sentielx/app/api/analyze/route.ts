import { NextResponse } from 'next/server';
import { analyzeCode } from '@/lib/mockAnalyzer';

export async function POST(req: Request) {
    try {
        const { code } = await req.json();

        // Small delay to simulate processing
        await new Promise((res) => setTimeout(res, 800));

        const report = analyzeCode(code);
        return NextResponse.json(report);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

