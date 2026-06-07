export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <p className="text-sm font-medium text-neutral-500">404</p>
        <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-neutral-600">This URL is not available on this site.</p>
      </div>
    </main>
  );
}
