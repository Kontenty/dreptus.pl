import colors from "tailwindcss/colors";

type Props = {
  color?: string;
};

const footmanPin = ({ color = colors.green[700] }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="50"
      fill="none"
      viewBox="0 0 40 50"
    >
      <path
        fill={color}
        stroke="#414140"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M39.5 20c0 9.34-4.904 16.72-9.858 21.793a49.72 49.72 0 0 1-6.805 5.79 42.92 42.92 0 0 1-2.24 1.483c-.253.156-.455.276-.597.359a28.218 28.218 0 0 1-.597-.359 42.92 42.92 0 0 1-2.24-1.484 49.72 49.72 0 0 1-6.805-5.79C5.404 36.72.5 29.34.5 20a19.5 19.5 0 0 1 39 0Z"
      />
      <path
        fill="#fff"
        d="M17.183 9.347v1.74h-.963l-1.303 1.685v1.142l-.85.924-.566 2.338c.604.617 1.87 1.925 2.096 2.23.283.38-.68 5.654-.68 6.307 0 .522-1.775 5.038-2.662 7.231l.226.87s-1.398 1.856-.566 2.012c2.606.49 5.268 0 5.268 0s.44-1.26-.227-1.413c-1.416-.327-2.039-.599-2.039-.599v-.38h.68l3.059-8.374c.094-.199.555-.087 1.643 1.958 1.087 2.044 2.34 4.948 2.832 6.144l.34.652v2.012h1.869l3.342-1.196s.453-.816 0-1.196-.793 0-.793 0h-2.04v-1.305l-5.267-13.104v-1.522l1.756.435.793-2.338 2.719.543c-.17-.036-.351-.533.283-2.229.634-1.696 1.435-2.374 1.756-2.501l-2.549-1.142c-.094-.163-.6-.054-1.87 1.686-1.268 1.74-1.85 3.153-1.982 3.643l-1.19-.762v-2.066h1.19l-1.53-1.685c-.226-.218-.475-.685.34-.816.816-.13 1.133-.96 1.19-1.36l1.643.436.226-.326-1.53-1.414v-1.25l-2.208-.653-1.247 1.25h-2.605v.381l2.152.87v1.142h-.736Z"
      />
    </svg>
  );
};

export default footmanPin;
