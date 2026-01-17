export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          &copy; {currentYear} Altek Pro LLC. Licensed. Orange County, CA
        </p>
      </div>
    </footer>
  );
}
