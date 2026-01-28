"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ExpiredUrlPageProps {
  originalUrl?: string;
}

export default function ExpiredUrlPage({ originalUrl }: ExpiredUrlPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-sm">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-800">URL Expired</h1>
        <p className="text-sm text-gray-600 mb-6">
          This short URL is no longer valid.{" "}
          {originalUrl && (
            <>
              <br />
              <span className="font-mono text-xs text-gray-500 break-all">
                Original: {originalUrl}
              </span>
            </>
          )}
        </p>
        <Link href="/shortener/urls" passHref>
          <Button variant="default" className="w-full">
            <ArrowLeft className="size-4 mr-1" /> Go Back
          </Button>
        </Link>
      </div>
      <p className="mt-4 text-xs text-gray-400">
        If you believe this is a mistake, please contact support.
      </p>
    </div>
  );
}
