# tldraw-whiteboard

_**A personal whiteboard for self-hosting. Turns a secondary screen into a self-mastery tool.**_

![example](.github/example.png)

This is a wrapper application for [tldraw](https://github.com/tldraw/tldraw). I take no credit for the whiteboard experience as it's completely borrowed.

## Differences

- Unsaved documents are persisted in localStorage to prevent data-loss on browser crashes.
- No analytics or telemetry (outside of any within [tldraw](https://github.com/tldraw/tldraw))
- Built for Docker/podman. Easily deployed to NAS/Self-hosting infrastructures.
- Based on the latest NextJS versioning.

## Create the image + container

> Docker and podman commands are interchangeable - podman is better though

```bash
# Define name and image
name=$(basename "$PWD")
image="$name:latest"

# Build image
podman build --tag "$image" --file ./Dockerfile;

# You can remove any local repo if you don't like lingering files

# Create new container (published port)
podman run --name="$name" -p 3000:3000 --detach "$image";
```

> *For best results, it's best if you put any next-js apps behinds a load balancer if you can for performance and security reason. If using a load balancer, using a shared network is better than using a published port.*


## Upcoming changes

- Allow large embeds in cache (right now persistence will fail if uploads are near or above 5MB in size due to localStorage constraints)
- Re-plug code to typescript once prototyping/testing phase is done
- Potential server-side persisting for containerized environments