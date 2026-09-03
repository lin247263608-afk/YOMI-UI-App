export type FlutterPickedImage = {
  id?: string;
  name?: string;
  url?: string;
  uri?: string;
  path?: string;
  base64?: string;
  mimeType?: string;
};

declare global {
  interface Window {
    flutter_inappwebview?: {
      callHandler: (handlerName: string, ...args: unknown[]) => Promise<unknown>;
    };
  }
}

function parsePickerResult(result: unknown): unknown {
  if (typeof result !== "string") return result;
  const trimmed = result.trim();
  if (!trimmed.startsWith("[") && !trimmed.startsWith("{")) return result;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return result;
  }
}

function toImageList(result: unknown): Array<string | FlutterPickedImage> {
  const parsed = parsePickerResult(result);
  if (Array.isArray(parsed)) return parsed as Array<string | FlutterPickedImage>;
  if (parsed && typeof parsed === "object" && "images" in parsed) {
    const images = (parsed as { images?: unknown }).images;
    return Array.isArray(images) ? (images as Array<string | FlutterPickedImage>) : [];
  }
  return parsed ? [parsed as string | FlutterPickedImage] : [];
}

export function flutterImageSource(image: string | FlutterPickedImage): string | null {
  if (typeof image === "string") return image || null;
  if (image.base64) {
    const mime = image.mimeType || "image/jpeg";
    return image.base64.startsWith("data:") ? image.base64 : `data:${mime};base64,${image.base64}`;
  }
  return image.url || image.uri || image.path || null;
}

/**
 * Flutter InAppWebView contract:
 * handler: yomiPickImages
 * args: { multiple: true, maxCount, accept: "image/*" }
 * result: image[] or { images: image[] }; each image may be a data URL or
 * { id, name, url/uri/path } / { base64, mimeType }.
 */
export async function pickImagesFromFlutter(maxCount: number) {
  const bridge = typeof window === "undefined" ? undefined : window.flutter_inappwebview;
  if (!bridge) return null;
  const result = await bridge.callHandler("yomiPickImages", {
    multiple: true,
    maxCount,
    accept: "image/*",
  });
  return toImageList(result).slice(0, maxCount);
}
