"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="route-state error-state"><p className="eyebrow">Something went wrong</p><h1>We could not load this page.</h1><p>Please try again. Your account and bag are unchanged.</p><button className="button-dark" onClick={() => reset()}>Try again</button></section>;
}
