import { LoadingManager } from "three";
const wrapAjax = (
  url: string,
  progress: (loaded: number, total: number) => void
) => {
  return new Promise<string>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const { loaded, total } = event;
        progress(loaded, total);
      }
    });
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status <= 400) {
          resolve(request.responseText);
        } else if (request.status >= 400) {
          reject(request);
        }
      }
    };
    request.open("get", url);
    request.send();
  });
};
export const usePreLoader = (
  urls: string[],
  onLoader: (res) => void,
  onProgress: (info: { loaded: number; total: number }) => void,
  onError: (error) => void
) => {
  let promises:Promise<string>[] = [];
  let progress: { [key: string]: { loaded: number; total: number } } = {};
  urls.forEach((item) => {
    promises.push(
      wrapAjax(item, (loaded, total) => {
        progress[item] = { loaded, total };
      })
    );
  });
  const timer = setInterval(() => {
    const [loaded, total] = Object.keys(progress).reduce(
      (add, item) => {
        add[0] += progress[item].loaded;
        add[1] += progress[item].total;
        return add;
      },
      [0, 0]
    );
    onProgress({ loaded, total });
  }, 100);
  Promise.all(promises)
    .then(
      (res) => {
        onLoader(res);
      },
      (fail) => {
        onError(fail);
      }
    )
    .finally(() => {
      clearInterval(timer);
    });
};
