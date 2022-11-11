type Props = {
  length?: number;
};

const Hr = ({ length = 10 }: Props) => {
  return (
    <div className="flex gap-6 max-w-full overflow-hidden">
      {Array.from(Array(length).keys()).map((i) => (
        <div key={i} className={i % 2 ? "pr-2 pt-3" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svg2457"
            viewBox="0 0 218 300"
            version="1.0"
            className="h-10"
            transform={i % 2 === 0 ? "scale(-1,1) rotate(270)" : "rotate(80)"}
          >
            <path
              id="path2470"
              d="m48.494 294.75c-1.925-0.67-4.483-1.78-5.685-2.46-1.201-0.68-2.644-1.24-3.205-1.24-0.562 0-2.679-1.12-4.706-2.5-2.026-1.37-4.486-2.5-5.466-2.5-1.954 0-8.938-7.56-8.938-9.68 0-1.83 0.113-1.81 24 3.63 5.225 1.19 12.65 2.83 16.5 3.64 10.481 2.22 15.499 3.6 16.005 4.42 0.25 0.4-2.31 2.21-5.688 4.01-6.948 3.7-16.601 4.84-22.817 2.68zm12-13.7c-15.373-3.16-37.406-8.83-34.689-8.93 1.683-0.06 35.241 7.24 47.689 10.38 9.435 2.37 1.148 1.45-13-1.45zm13-1.5c-4.728-1.09-5.009-1.28-2-1.31 1.925-0.02 5.3 0.56 7.5 1.28 5.094 1.68 1.693 1.7-5.5 0.03zm-18-3.53c-4.125-0.99-12.675-2.99-19-4.46-6.325-1.46-11.903-3.05-12.395-3.53-1.053-1.02-0.439-0.91 13.395 2.38 5.775 1.37 14.887 3.46 20.25 4.64 5.362 1.18 9.75 2.34 9.75 2.57 0 0.8-4.457 0.2-12-1.6zm24.25 0.84c-2.888-0.53-5.25-1.3-5.25-1.71 0-0.42 3.023-0.14 6.718 0.62 10.658 2.2 9.459 3.08-1.468 1.09zm2.5-3.5c-8.195-1.58-10.703-3.46-3.5-2.63 4.859 0.56 14.75 3.14 14.75 3.85s-2.729 0.42-11.25-1.22zm-27.75-1.81c-5.225-1.28-9.688-2.36-9.917-2.41s-0.167-0.34 0.139-0.64c0.636-0.64 18.51 3.35 20.778 4.64 2.502 1.42-0.49 0.99-11-1.59zm31.5-1.05c-3.3-0.73-7.709-1.6-9.797-1.94-3.647-0.59-7.068-4.48-5.407-6.14 0.342-0.34 6.378 0.6 13.413 2.09s13.425 2.74 14.2 2.79c0.838 0.05 0.229 1.03-1.5 2.41-3.265 2.62-2.762 2.58-10.909 0.79zm-29.35-2.08c-7.784-1.69-11.051-3.29-6.804-3.34 3.304-0.03 13.71 2.78 15.104 4.08 1.207 1.13-0.255 1-8.3-0.74zm-30.15-3.37c-3.575-0.99-5.825-1.85-5-1.9 2.029-0.13 15.055 2.62 15.766 3.34 1.081 1.08-4.298 0.36-10.766-1.44zm32 0.32c-3.558-0.58-8-2.43-8-3.32 0-3.62 11.06-3.62 12.997 0 2.077 3.88 1.35 4.36-4.997 3.32zm-25.5-2.79c-4-1.32-4-1.32-0.832-1.42 3.667-0.12 6.332 0.72 6.332 2 0 1.11-0.534 1.06-5.5-0.58zm-12.5-3.11c-4.5-1.39-4.5-1.39-0.097-0.87 4.31 0.51 9.463 2.48 6.097 2.32-0.825-0.03-3.525-0.69-6-1.45zm16 0.43c-1.375-0.56-6.546-1.78-11.492-2.71-8.935-1.68-10.669-2.84-8.722-5.85 0.609-0.94 2.003-0.9 6.249 0.2 3.005 0.78 6.76 1.64 8.344 1.92 4.317 0.76 14.075 2.9 14.44 3.16 0.175 0.13-0.27 1.18-0.991 2.33-1.415 2.27-3.879 2.57-7.828 0.95zm54.688-0.84c-9.152-2.11-9.801-2.54-6.865-4.6 1.212-0.85 3.106-3.31 4.21-5.47 2.381-4.67 1.564-4.58 11.493-1.34 11.45 3.73 11.14 3.37 7.25 8.48-3.96 5.2-5.2 5.43-16.088 2.93zm-26.046-8.04c-11.723-3.51-13.022-20.99-1.906-25.63 12.699-5.31 25.258 8.85 18.111 20.41-3.299 5.34-9.334 7.28-16.205 5.22zm9.694-4.91c1.559-0.59 2.907-2.27 3.662-4.55 2.248-6.82-2.238-12.51-9.853-12.51-4.955 0-8.041 2.47-8.766 7-1.178 7.36 7.212 13.01 14.957 10.06zm-7.975-6.56c-0.792-2.06 0.282-4.5 1.985-4.5 2.002 0 3.984 2.7 3.297 4.49-0.75 1.95-4.534 1.96-5.282 0.01zm-18.177 9.64c-1.591-1.01-2.76-14.64-1.529-17.83 0.583-1.51 0.845 0.05 0.845 5.05 0 5.2 0.49 7.98 1.75 9.9 2.467 3.77 2.062 4.86-1.066 2.88zm-20.165-3.82c-6.314-1.34-11.801-2.96-12.193-3.6-0.758-1.23 3.932-10.72 5.295-10.72 0.443 0 3.088 0.9 5.879 2 6.417 2.53 8 2.52 8-0.06 0-1.31-0.452-1.83-1.25-1.43-0.688 0.35 0.285-0.73 2.162-2.4 1.877-1.66 3.859-2.75 4.405-2.41 0.57 0.35 0.676 0.1 0.248-0.59-0.574-0.93-1.099-0.91-2.299 0.09-1.349 1.12-1.461 0.99-0.843-0.96 1.083-3.41-1.07-2.69-2.274 0.76-0.575 1.65-1.761 3-2.636 3-1.319 0-1.242-0.37 0.448-2.19 1.121-1.2 2.003-2.89 1.96-3.75-0.056-1.1-0.231-1.18-0.601-0.26-0.393 0.98-0.884 0.86-1.977-0.5-1.334-1.65-1.363-1.61-0.352 0.47 1.434 2.96 0.381 4.54-2.644 3.96-2.348-0.45-2.366-0.41-0.636 1.51 1.768 1.95 1.753 1.95-1.965 0.18-4.401-2.1-4.412-2.15-1.496-6.43 3.726-5.47 4.611-5.58 11.08-1.38 5.184 3.36 5.757 4.06 5.188 6.34-0.352 1.4-0.9 3.9-1.217 5.55-0.664 3.45-2.352 4.94-3.619 3.2-0.583-0.8-0.693-0.64-0.333 0.49 0.296 0.92 0.001 1.9-0.656 2.17-0.656 0.27-0.406 0.52 0.557 0.56 0.962 0.05 1.75-0.37 1.75-0.92s0.353-1 0.784-1c0.432 0 1.239 2.48 1.793 5.5 0.695 3.8 0.684 5.47-0.035 5.39-0.573-0.07-6.209-1.22-12.523-2.57zm6.227-7.15c0.272-1.04-0.05-1.83-0.746-1.83-0.697 0-1.019 0.79-0.747 1.83 0.264 1.01 0.6 1.83 0.747 1.83 0.146 0 0.482-0.82 0.746-1.83zm5.039-7.15c0.29-1.11 0.119-2.02-0.379-2.02-0.499 0-0.913 0.56-0.922 1.25-0.01 0.84-0.338 0.75-0.984-0.25-0.829-1.28-0.972-1.24-0.985 0.25-0.009 0.96 0.461 1.75 1.044 1.75 0.582 0 0.737 0.52 0.345 1.16-0.412 0.66-0.277 0.88 0.32 0.51 0.569-0.35 1.271-1.54 1.561-2.65zm70.711 12.92c0-0.58-0.48-0.76-1.06-0.4-0.59 0.37-1.32-0.28-1.62-1.44-0.3-1.15-0.97-2.1-1.49-2.1s-0.67 0.45-0.33 1-0.09 1-0.97 1c-0.87 0-2-1.01-2.5-2.25-0.67-1.67-0.92-1.81-0.96-0.53-0.04 1.07-0.61 1.51-1.5 1.17-0.794-0.31-1.195-1.19-0.896-1.97 0.623-1.62-0.999-1.85-3.54-0.49-2.269 1.22-3.663 0.22-4.503-3.21-0.613-2.5 1.135-6.19 5.942-12.54 0.364-0.48 5.727 2.41 10.777 5.82 2.44 1.65 4.9 3 5.47 3 1.92 0 7.17 3.5 7.18 4.78 0 0.71-0.68 1.55-1.51 1.87-2.22 0.85-7.48-1.62-7.5-3.52-0.01-1.21-0.22-1.3-0.83-0.35-1.13 1.78-7.03-0.69-6.36-2.67 0.32-0.96 0.04-1.13-0.9-0.54-0.75 0.46-2.84 0.71-4.632 0.56-6.631-0.57-2.934 2.08 13.432 9.63 3.17 1.46 3.92 2.22 3.05 3.09-1.44 1.45-4.75 1.51-4.75 0.09zm6-8.94c0-0.55-0.67-1-1.5-1-0.82 0-1.5 0.45-1.5 1s0.68 1 1.5 1c0.83 0 1.5-0.45 1.5-1zm-32.892-17.43c-1.717-3.79-2.959-7.05-2.759-7.25 0.541-0.54 9.982 6.02 10.338 7.18 0.168 0.55-0.766 2.34-2.076 3.98-2.382 2.98-2.382 2.98-5.503-3.91zm-28.117 2.45c6.671-4.43 18.681-6.57 19.684-3.52 0.199 0.61-2.563 1-7.003 1-6.369 0-7.853 0.36-11.304 2.75-2.185 1.51-4.398 2.75-4.918 2.75-0.521 0 1.073-1.35 3.541-2.98zm-13.043-3.84c-1.955-1.47-4.642-3.4-5.97-4.28-2.415-1.6-2.415-1.6 1.52-6.76 4.227-5.54 6.074-6.09 5.89-1.75-0.081 1.92 0.288 2.57 1.25 2.2 0.816-0.31 1.394 0.17 1.436 1.19 0.058 1.44 0.213 1.39 0.93-0.28 0.578-1.35 0.887-1.51 0.945-0.5 0.076 1.34 0.193 1.34 1.055 0 0.533-0.82 0.969-1.05 0.969-0.5 0 1.91-1.486 3-4.393 3.22-1.607 0.12-3.33 0.8-3.828 1.5-0.599 0.85-0.755 0.34-0.461-1.49 0.244-1.53-0.015-3.06-0.576-3.41-0.561-0.34-0.74-0.17-0.398 0.38s-0.024 1.86-0.814 2.9c-0.79 1.05-1.443 2.58-1.452 3.4-0.015 1.34 0.091 1.34 0.953 0 0.835-1.29 0.971-1.26 0.984 0.19 0.017 1.88 1.788 3.37 2.803 2.36 0.36-0.36-0.007-1.08-0.816-1.59-1.224-0.77-1.167-0.93 0.338-0.94 0.994-0.01 1.577-0.39 1.294-0.85-0.284-0.46 0.074-0.83 0.795-0.83 1.078 0 1.077 0.44-0.007 2.53-1.409 2.72-1.194 3.75 0.558 2.66 0.596-0.37 0.773-1.2 0.395-1.85-0.379-0.65 0.287-0.32 1.48 0.72 1.661 1.46 1.907 2.22 1.05 3.25-1.461 1.76-1.738 1.69-5.93-1.47zm8.728-4.01c-1.286-1.44-1.294-1.84-0.057-2.98 0.786-0.72 1.185-1.7 0.887-2.18-0.502-0.82 2.001-0.28 6.998 1.49 1.1 0.39 0.537-0.23-1.25-1.38-1.788-1.15-3.25-2.51-3.25-3.03s-0.708-1.65-1.572-2.52c-1.428-1.43-1.338-1.57 1-1.57 1.414 0 2.572-0.43 2.572-0.97 0-0.53 0.562-0.83 1.25-0.66 0.687 0.17 0.912 0.12 0.5-0.12-0.413-0.23-0.795-1.39-0.85-2.58-0.09-1.96-0.166-1.93-0.795 0.33-0.855 3.08-5.587 3.58-7.53 0.81-0.69-0.99-1.624-1.46-2.076-1.05-0.451 0.41-0.492 0.17-0.091-0.52 0.401-0.7 1.143-1.01 1.649-0.7s0.688-0.04 0.405-0.77c-0.283-0.74 0.825-2.63 2.462-4.2 2.976-2.85 2.976-2.85 10.276 3.88 6.521 6 10.512 11.7 10.725 15.3 0.051 0.86-1.713 1.26-5.675 1.27-3.465 0.02-7.408 0.78-9.922 1.92-3.885 1.76-4.273 1.78-5.656 0.23zm9.328-7.17c0-0.55-1.238-0.95-2.75-0.9-2.75 0.1-2.75 0.1-0.25 0.9 1.375 0.44 2.612 0.85 2.75 0.9 0.137 0.06 0.25-0.35 0.25-0.9zm94.246-25.59c-2.33-2.48-4.25-4.26-4.25-3.96s-0.85-0.24-1.9-1.2c-1.04-0.96-3.06-2.81-4.5-4.1-1.43-1.3-2.6-2.8-2.6-3.34 0-1.05 12.37 9.48 14.33 12.2 0.64 0.89 1.96 1.92 2.92 2.28 1.71 0.63 2.5 2.76 1 2.66-0.41-0.02-2.66-2.07-5-4.54zm9.31-5.63c-0.86-1.22-1.56-1.87-1.56-1.43s-0.67 0.12-1.5-0.71c-2-2-1.89-2.55 0.39-1.96 2.18 0.57 3.72-1.19 1.98-2.26-0.74-0.46-0.91-0.29-0.46 0.43 0.85 1.38-0.34 1.48-2.38 0.19-0.94-0.59-1.71-0.56-2.11 0.1-0.38 0.61-0.89 0.37-1.27-0.61-0.38-1.01-0.22-1.38 0.43-0.98 0.58 0.36 0.97 0.04 0.87-0.7s-0.12-2.25-0.03-3.35c0.13-1.83 0.23-1.86 1.16-0.26 1.43 2.46 5.1 4.38 4.28 2.24-0.33-0.86-0.81-1.36-1.07-1.1-0.25 0.25-1.76-0.97-3.34-2.71-1.59-1.74-2.9-2.61-2.92-1.92-0.01 0.69 0.41 1.25 0.94 1.25s0.71 0.69 0.38 1.53c-0.5 1.32-0.76 1.29-1.88-0.25-1.16-1.58-1.28-1.44-1.08 1.36 0.19 2.78 0.01 3-1.59 2-0.99-0.61-1.8-1.46-1.8-1.88s-0.62-0.76-1.38-0.76-1.63-0.94-1.93-2.1c-0.3-1.15-0.31-1.85-0.01-1.56 0.55 0.56 6.41-7.68 8.95-12.59 0.78-1.51 1.9-2.75 2.48-2.75 1.7 0 19.79 11.41 19.84 12.52 0.09 1.75-4.95 8.48-6.35 8.48-0.73 0-2.48-1.16-3.9-2.58s-3.22-2.67-3.99-2.78c-0.77-0.12-2.63-1.01-4.13-2-2.72-1.78-2.72-1.78-1.51 0.48 0.66 1.24 3.47 4.34 6.24 6.89 3.26 3 4.76 5.07 4.26 5.88-0.42 0.69-1.32 1.04-2 0.78s-1.23 0.13-1.23 0.88 0.42 1.1 0.93 0.79c0.51-0.32 0.42 0.37-0.2 1.54-1.41 2.64-1.59 2.64-3.51-0.1zm-29.56-10.18c0-1.95 1.28-2.66 2.94-1.64 1.03 0.64 0.85 1.09-0.8 1.97-1.73 0.93-2.14 0.86-2.14-0.33zm8.03-7.91c-0.01-1 1.1-3.3 2.48-5.1 1.37-1.81 3.55-5.27 4.83-7.69 2.32-4.38 4.88-5.75 5.42-2.9 0.16 0.83-0.85 2.72-2.24 4.21-1.38 1.49-2.53 3.06-2.55 3.5-0.01 0.43-1.8 2.82-3.97 5.29-2.85 3.26-3.95 4-3.97 2.69zm-10.53-5.22c-1.52-1.24-1.6-1.51-0.33-1.11 0.94 0.29 1.92-0.13 2.24-0.97 0.31-0.82 0.17-1.24-0.33-0.94-1.28 0.8-4.17-0.48-3.51-1.55 0.3-0.5 0.03-0.9-0.62-0.9-0.74 0-0.94-0.9-0.54-2.5 0.35-1.37 0.22-2.5-0.28-2.5-1.23 0-2.29 2.93-1.51 4.19 0.36 0.59-0.27 0.53-1.5-0.12-1.16-0.63-2.12-0.79-2.13-0.35-0.01 0.43-0.41 0.17-0.88-0.58-0.53-0.83-0.36-2.36 0.43-3.87 0.74-1.42 1.06-3.97 0.75-5.89-0.31-1.89-0.12-3.38 0.42-3.38s4.51 3.29 8.82 7.31c7.85 7.31 7.85 7.31 4.41 11.05-3.26 3.55-3.54 3.66-5.44 2.11zm41-7.62c-10.01-6.75-10.39-7.21-8.08-9.75 1.81-2.01 8.58-18.24 8.58-20.58 0-2.18 0.89-1.99 12.49 2.71 9.88 4 10.41 4.36 9.89 6.75-1.02 4.65-3.52 11.99-4.24 12.44-0.4 0.24-2.81-0.86-5.37-2.46-5.7-3.55-10.97-5.15-8.98-2.73 0.7 0.86 3.73 3.07 6.73 4.92 2.99 1.84 5.45 3.74 5.46 4.22 0.04 1.73-5.32 10.63-6.39 10.59-0.6-0.02-5.14-2.77-10.09-6.11zm-61.5 0.15c0-1.86 0.27-2.13 1.2-1.2 0.94 0.94 0.94 1.47 0 2.4-0.93 0.94-1.2 0.67-1.2-1.2zm25.5-11.07c-8.04-6.9-9.09-8.93-4.63-8.93 1.66 0 3.29-0.45 3.63-1s1.51-1 2.59-1c1.14 0 2.34-0.98 2.86-2.36 0.5-1.3 1.68-2.66 2.63-3.03 2-0.77 10.1 2.07 10.7 3.75 0.42 1.17-9.17 18.67-10.2 18.61-0.32-0.02-3.73-2.74-7.58-6.04zm-21.85 1.31c-0.27-0.44 0.32-3.19 1.31-6.11 2.13-6.28 3.61-5.26 1.95 1.34-1.15 4.55-2.33 6.28-3.26 4.77zm41.96-0.81c-0.36-0.94 0.34-3.21 1.63-5.29 3.05-4.89 5.14-9.68 6.71-15.39 1.45-5.23 4.09-6.55 4-2-0.06 3.26-8.97 23.43-10.58 23.96-0.62 0.21-1.41-0.37-1.76-1.28zm-70.578-0.39c-0.809-0.51-1.211-1.19-0.893-1.51 0.788-0.78 3.865 0.47 3.865 1.58 0 1.14-1.102 1.11-2.972-0.07zm19.968-2.54c-2.5-1.43-2.5-1.43 0.59-1.46 2.09-0.03 3.08 0.45 3.08 1.46 0 1.83-0.47 1.83-3.67 0zm3.35-3.97c0.31-0.8 0.14-1.73-0.39-2.06-0.53-0.32-0.96-1.06-0.96-1.65 0-0.67 0.56-0.6 1.5 0.18 2.31 1.92 1.89-0.43-0.87-4.79-1.3-2.07-2.69-5.21-3.07-6.97-0.39-1.77-1.23-3.54-1.87-3.93-1.64-1.01-4.686-1.13-4.686-0.17 0 0.44-0.765 0.51-1.7 0.15-1.063-0.41-1.25-0.8-0.5-1.05 0.66-0.22 1.2-0.83 1.2-1.36 0-0.54-0.912-0.46-2.128 0.19-1.659 0.89-2.315 0.84-2.984-0.21-0.67-1.06-0.861-0.98-0.873 0.36-0.011 1.17-0.533 1.52-1.622 1.1-1.687-0.64-1.364-7.494 0.38-8.076 0.452-0.15 0.634-1.882 0.404-3.847-0.417-3.573-0.417-3.573 7.811 0.72 8.228 4.294 8.228 4.294 7.658 8.443-0.72 5.23 0.73 10.54 3.89 14.3 2.35 2.8 2.39 3.07 0.95 6.53-1.42 3.38-3.36 5.34-2.14 2.14zm-20.096-3.75c-1.238-0.6-2.25-1.93-2.25-2.97 0-1.56 0.239-1.67 1.399-0.6 0.769 0.71 1.226 1.47 1.015 1.69s0.397 1 1.351 1.72c2.079 1.58 1.543 1.64-1.515 0.16zm16.746-2.78c0-1.86 0.27-2.13 1.2-1.2 0.94 0.94 0.94 1.47 0 2.4-0.93 0.94-1.2 0.67-1.2-1.2zm15.42-2.55c-7.7-2.83-10.43-11.7-6.19-20.177 2.69-5.387 6.01-7.271 12.82-7.271 8.77 0 14.33 7.828 12.5 17.578-1.62 8.66-10.26 13.12-19.13 9.87zm8.9-5.57c6.3-3.22 7.56-10.12 2.61-14.289-4.71-3.963-10.72-2.826-13.5 2.556-4.17 8.063 2.99 15.773 10.89 11.733zm-4.89-4.63c-1.85-1.29-2.34-3.99-1.04-5.76 2.55-3.491 8.31 0.6 6 4.26-1.24 1.98-3.36 2.62-4.96 1.5zm-37.85 6.75c0.928-3.45 1.026-3.49 3.979-1.55 2.991 1.96 2.656 3.27-0.416 1.63-1.63-0.88-2.251-0.74-3.134 0.67-0.921 1.46-0.991 1.34-0.429-0.75zm14.92 1c-0.34-0.55 0.09-1 0.94-1 0.86 0 1.56 0.45 1.56 1s-0.42 1-0.94 1-1.22-0.45-1.56-1zm90.98-2.44c-1.59-1.36-3.09-2.28-3.34-2.03-0.24 0.24-1.88-0.44-3.64-1.53-1.75-1.08-3.44-1.72-3.75-1.41-1.05 1.05-6.75-2.64-6.73-4.36 0-0.95 0.67-4.203 1.48-7.228 0.82-3.025 1.49-6.989 1.49-8.809 0.01-1.82 0.35-3.102 0.76-2.849 0.42 0.253 2.55 0.72 4.75 1.039 2.2 0.318 7.52 1.375 11.82 2.348 7.82 1.771 7.82 1.771 7.17 6.149-1.06 7.18-1.17 7.29-5.33 5.48-2.01-0.873-4.22-1.611-4.91-1.639-0.68-0.029-1.25-0.765-1.26-1.636-0.01-1.275-0.19-1.318-0.88-0.22-0.65 1.026-1.14 0.656-1.99-1.5-1.13-2.863-1.13-2.863-0.58-0.029 0.32 1.666 0.15 2.592-0.41 2.246-0.52-0.322-1.67-0.308-2.56 0.032-2.17 0.834 3.08 3.625 10.25 5.446 4.65 1.18 5.23 1.61 4.66 3.4-0.36 1.12-0.95 3.58-1.32 5.46-0.85 4.37-2.09 4.73-5.68 1.64zm-41.89-0.82c-3.75-2.15-3.91-2.46-4.07-7.74-0.1-3.02-0.92-6.938-1.84-8.698-2.39-4.571-2.33-4.628 4.57-3.889 12.76 1.366 12.94 1.439 12.21 4.96-1.61 7.857-4.87 17.627-5.86 17.617-0.6-0.01-2.86-1.03-5.01-2.25zm17.41-10.49c0.01-0.961 0.68-5.573 1.5-10.248 0.83-4.675 1.5-8.703 1.5-8.95 0-0.248 0.46 0.007 1.02 0.566 1.67 1.673-1.16 20.382-3.08 20.382-0.52 0-0.94-0.79-0.94-1.75zm-67.69-14.294c-8.19-3.873-8.19-3.873-7.308-6.949 0.485-1.692 1.809-4.576 2.942-6.409 1.133-1.832 2.06-4.136 2.06-5.119 0-1.605 0.177-1.635 1.746-0.291 3.19 2.726 13.99 8.814 15.63 8.814 4.24 0-1.23-5.437-10.11-10.049-6.23-3.239-6.23-3.239-4.19-6.845 1.13-1.983 3.2-4.929 4.6-6.546 2.37-2.731 2.72-2.838 4.87-1.5 1.28 0.792 6.4 3.836 11.39 6.765 4.98 2.929 9.06 5.949 9.06 6.711 0 0.761-2.11 5.247-4.7 9.967-3.99 7.282-5.31 8.854-8.75 10.377-2.23 0.987-4.66 2.543-5.42 3.457-1.82 2.211-2.31 2.114-11.82-2.383zm50.33-0.454c-0.37-0.964-1.93-1.505-4.36-1.514-6.74-0.024-8.51-0.904-7.78-3.872 0.36-1.438 1.06-2.761 1.56-2.942 0.5-0.18 2.27-2.88 3.94-6 1.66-3.119 4.04-6.945 5.28-8.5 2.26-2.828 2.26-2.828 8.74 0.626 7.22 3.844 6.73 2.436 5.46 15.975-0.64 6.774-0.64 6.774-5.56 6.122-3.37-0.448-4.92-0.298-4.92 0.476 0 1.646-1.69 1.381-2.36-0.371zm-23.22-4.25c0.13-1.488 6.02-13.878 7.23-15.191 0.22-0.242 1.08 0.238 1.91 1.066 1.34 1.342 1.05 2.291-2.66 8.691-3.96 6.841-6.79 9.219-6.48 5.434zm70.33-0.939c-1.85-0.485-2.44-2.311-0.75-2.311 0.55 0 1-0.45 1-1s-0.7-1-1.56-1c-1.15 0-1.39-0.574-0.89-2.151 0.54-1.711 0.35-2.025-0.93-1.532-1.83 0.703-2.04-0.118-0.6-2.317 0.87-1.333 1.09-1.333 1.97 0 0.84 1.284 0.99 1.248 1-0.25 0.01-0.963-0.44-1.75-0.99-1.75s-1-0.45-1-1c0-1.556 5.31-1.176 7.78 0.557 1.62 1.135 2.22 2.557 2.21 5.25-0.03 7.744-1.29 9.056-7.24 7.504zm1.15-9.728c-0.1-3.943-0.13-3.977-0.84-0.996-0.41 1.698-1.01 3.536-1.35 4.084-0.34 0.547 0.04 0.996 0.84 0.996 1.05 0 1.43-1.129 1.35-4.084zm-13.25 6.727c-0.14-0.142-2.45-0.52-5.13-0.842-8.02-0.963-8.69-1.662-8.4-8.763 0.23-5.608 0.52-6.339 3.32-8.277 2.81-1.948 4.97-1.915 7.39 0.114 0.18 0.15-0.32 1.551-1.1 3.115-1.1 2.184-1.19 3.655-0.39 6.343 0.96 3.246 1.07 3.318 1.44 1 0.22-1.375 1.11-3.288 1.97-4.25 1.41-1.581 1.08-2.197-1-1.868-0.41 0.065-0.75-0.557-0.75-1.382s0.63-1.5 1.4-1.5c2.13 0 2.84 3.086 1.13 4.973-1.68 1.854-2.03 4.027-0.64 4.027 0.48 0 1.14-0.993 1.46-2.206 0.31-1.214 0.85-1.927 1.19-1.586 0.35 0.341 0.22 1.447-0.28 2.456-0.5 1.01-0.59 3.186-0.2 4.836 0.49 2.083 0.76 2.388 0.9 1 0.18-2 0.18-2 1.04 0 1.3 3.021 1.18 3.389-1.05 3.221-1.12-0.085-2.16-0.27-2.3-0.411zm-6.5-11.628c-0.62-0.751-0.8-1.734-0.39-2.184s0.18-0.494-0.51-0.098c-0.94 0.539-0.98 1.232-0.17 2.746 0.6 1.114 1.34 1.773 1.65 1.464s0.05-1.176-0.58-1.928zm12.56 2.318c-0.28-1.1-0.11-2 0.39-2s0.9 0.9 0.9 2-0.17 2-0.38 2-0.62-0.9-0.91-2zm9.54-3.221c-1.23-0.596-2.25-1.466-2.25-1.932 0-1.405 1.65-0.961 4.14 1.12 2.58 2.143 1.68 2.53-1.89 0.812zm-6-2.441c-2.04-0.826-1.41-2.194 0.75-1.628 1.1 0.288 2 0.921 2 1.407 0 0.953-0.78 1.016-2.75 0.221zm-60.67-5.737c-3.23-2.42-9.41-6.501-13.73-9.068-4.31-2.568-7.85-4.936-7.85-5.263 0-0.983 5.04-9.27 5.64-9.27 1.8 0 11.42 3.287 11.9 4.066 0.32 0.513 1.4 0.934 2.4 0.934s2.36 0.65 3.02 1.446c0.66 0.795 3.61 1.984 6.55 2.642 4.49 1.006 5.45 1.615 5.97 3.805 0.34 1.434 0.83 3.323 1.09 4.198 0.49 1.682-6.34 10.898-8.09 10.905-0.56 0.002-3.66-1.976-6.9-4.395zm62.54 1.804c-2.41-1.28-4.88-2.508-5.5-2.729-0.61-0.221-0.86-0.678-0.56-1.015 0.31-0.337 2.22 0.277 4.25 1.365s3.69 1.74 3.69 1.45 1.35 0.171 3 1.024 3 1.765 3 2.026c0 1.075-3.77 0.059-7.88-2.121zm-37.87-0.989c-2.27-0.994-3.25-2.098-3.26-3.669-0.01-1.236-0.29-3.26-0.62-4.497-0.46-1.74-0.18-2.257 1.27-2.28 1.74-0.029 1.75-0.096 0.11-1.05-0.96-0.561-1.75-1.672-1.75-2.47 0-1.817 0.41-1.81 4.05 0.072 4.08 2.112 7.95 3.529 7.95 2.911 0-0.284-3-1.863-6.66-3.508-5.04-2.259-6.39-3.273-5.52-4.145 1.27-1.262 22.18 8.413 22.18 10.259 0 1.245-0.11 1.231-4.34-0.539-4.26-1.779-5-1.858-4.12-0.438 0.36 0.584 1.81 1.5 3.22 2.037 1.7 0.645 2.23 1.311 1.58 1.967-0.66 0.657-1.98 0.477-3.92-0.531-4.36-2.274-5.41-1.817-1.53 0.667 3.39 2.168 3.39 2.168 0.5 4.478-3.28 2.628-4.57 2.732-9.14 0.736zm24.5-0.105c-0.96-0.252-1.75-0.875-1.75-1.384 0-1.343 1.34-1.14 3.56 0.541 1.95 1.471 1.46 1.697-1.81 0.843zm14.25-2.911c-3.02-1.42-10.67-4.602-17-7.071-6.32-2.47-12.4-5.049-13.5-5.732-1.1-0.682-4.02-2.034-6.5-3.003-10.06-3.943-34.01-14.913-33.55-15.371 1.04-1.047 27.55 9.734 40.67 16.545 4.19 2.175 9.59 4.66 12 5.522 10.56 3.778 24.88 10.246 24.88 11.236 0 0.905-1.53 0.441-7-2.126zm-12.25-0.562c-2.62-0.958-3.81-2.838-1.79-2.838 1.66 0 6.04 2.289 6.04 3.16 0 1.025-0.7 0.972-4.25-0.322zm16.25-1.55c-0.82-0.305-3.97-1.766-7-3.247-3.02-1.48-5.72-2.741-6-2.802-1.35-0.299-4.9-1.658-8.5-3.258-2.2-0.978-7.82-3.422-12.5-5.431-4.67-2.009-9.2-4.033-10.07-4.498-0.86-0.464-5.07-2.302-9.34-4.082-11.34-4.717-19.77-9.079-16.09-8.315 6.18 1.279 30 11.242 34.66 14.492 1.46 1.019 2.96 1.853 3.35 1.853 0.38 0 2.11 0.647 3.84 1.438 1.74 0.79 6.08 2.633 9.65 4.095 3.58 1.462 7.85 3.262 9.5 4s4.69 2.022 6.75 2.853c2.07 0.832 3.75 1.985 3.75 2.563s-0.11 1.015-0.25 0.972c-0.13-0.043-0.92-0.328-1.75-0.633zm-1-5.288c-0.82-0.533-2.51-0.976-3.75-0.985-1.23-0.008-2.25-0.465-2.25-1.015s-0.59-1-1.31-1c-0.73 0-4.75-1.745-8.95-3.877-4.19-2.133-8.83-4.181-10.31-4.552-4.47-1.121-41.69-17.638-41.1-18.234 0.83-0.828 14.23 4.203 28.17 10.579 8.25 3.772 20.4 9.238 27 12.147s12.66 5.885 13.47 6.613c1.71 1.544 1.19 1.718-0.97 0.324zm-4.5-5.984c-2.21-0.951-6.48-2.874-9.5-4.275-3.03-1.401-9.77-4.222-15-6.269-15.06-5.9-37.57-16.359-35.37-16.434 1.7-0.057 13.91 4.666 22.14 8.561 3.99 1.893 9.58 4.356 12.42 5.476 5.39 2.122 29 12.883 29.73 13.545 1.32 1.201-0.96 0.891-4.42-0.604zm-59.04-3.777c-4.43-2.056-9.71-4.386-11.75-5.176s-3.71-1.76-3.71-2.156c0-1.028 4.22 0.137 6 1.656 0.83 0.705 2.85 1.595 4.5 1.978s3.96 1.29 5.12 2.016c1.17 0.725 3.61 1.704 5.44 2.177 1.82 0.472 3.49 1.4 3.71 2.062 0.61 1.828-0.58 1.502-9.31-2.557zm11 1.305c-0.53-0.727-6.25-3.692-12.72-6.587s-11.63-5.395-11.47-5.556c0.31-0.313 9.61 2.928 18.98 6.614 3.17 1.245 5.75 2.838 5.75 3.54 0 0.703 0.54 1.458 1.2 1.679 0.75 0.248 0.83 0.634 0.21 1.016-0.55 0.34-1.43 0.022-1.95-0.706zm43.68-4.093c-2.94-1.339-5.76-2.186-6.25-1.884-0.49 0.303-0.89 0.074-0.89-0.508s-0.56-1.058-1.25-1.056c-1.23 0.004-15.15-6.021-33.75-14.603-12.91-5.96-9.56-5.565 5.1 0.6 6.54 2.75 12.13 5 12.44 5 0.3 0 3.34 1.273 6.76 2.83 3.41 1.556 10.36 4.594 15.44 6.75s9.24 4.257 9.25 4.67c0.02 1.127-0.98 0.863-6.85-1.799zm-1.14-5.451c-3.02-1.598-6.14-2.927-6.94-2.953-1.77-0.058-33.65-13.653-36.98-15.774-2.41-1.5403-2.41-1.5403 0.42-3.024 4.28-2.2417 21.32-0.8874 28 2.2249 5.3 2.4681 17.5 13.536 17.5 15.872 0 0.761 0.94 2.57 2.08 4.019s1.92 2.614 1.75 2.588c-0.18-0.026-2.8-1.355-5.83-2.953z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Hr;
