export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce animation-delay-150" />
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce animation-delay-300" />
      </div>
    </div>
  );
}
