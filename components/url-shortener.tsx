"use client";

import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link2, Scissors, Copy } from "lucide-react";

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!longUrl) {
      toast.error("Please enter a URL to shorten")
      setError("Please enter a URL to shorten");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      longUrl: longUrl,
      alias: alias,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };


    toast.promise(
      fetch("/api/generate", requestOptions)
        .then(async (response) => {
          const result = await response.json() as { message: string; success: boolean; error: boolean };
          if (result.success === false || result.error === true) {
            setShortUrl("");
            setError(result.message);
            throw new Error(result.message); // Rejects the promise to trigger the error toast
          } else {
            setError("");
            setShortUrl(`${process.env.NEXT_PUBLIC_HOST}/${alias}`);
            setLongUrl("");
            setAlias("");
            console.log(result);
            return result.message; // Resolves the promise to trigger the success toast
          }
        })
        .catch((error) => {
          throw error; // Ensures any errors trigger the error toast
        }),
      {
        loading: "Processing...",
        success: <b>URL shortened successfully!</b>,
        error: <b>URL already exists.</b>,
      }
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        toast("URL copied to clipboard");
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy URL: ");
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-black/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-gray-900">
            <Scissors className="mr-2" />
            URL Shortener
          </CardTitle>
          <CardDescription className="text-center text-gray-600 font-serif">
            Trim your links, expand your reach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="longUrl"
                className="text-sm font-medium text-gray-700"
              >
                Long URL
              </Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Link2 className="h-5 w-5" />
                </span>
                <Input
                  id="longUrl"
                  type="url"
                  placeholder="https://example.com/very/long/url"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="rounded-l-none focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="alias"
                className="text-sm font-medium text-gray-700"
              >
                Custom Alias
              </Label>
              <Input
                id="alias"
                type="text"
                placeholder="my-custom-url"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              Generate Short URL
            </Button>
            <Toaster 
              position="top-center"
            />
          </form>
        </CardContent>
        {error && (
          <Alert variant="destructive" className="mt-4 bg-red-50">
            <AlertTitle className="font-semibold">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {shortUrl && (
          <CardFooter className="flex flex-col items-center space-y-2">
            <div className="text-sm font-medium text-gray-600">
              Your shortened URL:
            </div>
            <div className="flex gap-2 items-center space-x-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center font-medium"
              >
                {shortUrl}
              </a>
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="border-gray-300 hover:bg-gray-100"
              >
                <Copy className="h-2 w-2" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
