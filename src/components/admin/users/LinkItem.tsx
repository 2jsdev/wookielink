export default function LinkItem({ link }: { link: any }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full p-3 text-center text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      {link.label}
    </a>
  );
}
