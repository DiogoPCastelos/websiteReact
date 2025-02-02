self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/images/react.webp",
        "/images/vite.webp",
        "/images/tailwind.webp",
        "/images/py.webp",
        "/images/c.webp",
        "/images/post.webp",
        "/images/node.webp",
        "/images/npm.webp",
        "/images/git.webp",
        "/images/figma.webp",
        "/images/js.webp",
        "/images/java.webp",
        "/images/html.webp",
        "/images/css.webp",
        "/images/docker.webp",
        "/images/spring.webp",
        "/images/mongo.webp",
        "/images/google.webp",
        "/images/discord.webp",
        "/images/bash.webp",
        "/images/asm.webp",
        "/images/kotlin.webp",
        "/images/jira.webp",
        "/images/linux.webp",
        "/images/lua.webp",
        "/images/django.webp",
        "/images/ava.webp",
        "/docs/CV - Diogo Piteira Castelos.pdf",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch(() => caches.match("/offline.html"))
  );
});
