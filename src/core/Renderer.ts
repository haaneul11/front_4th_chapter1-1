function Renderer() {
  let root: any, component: any;
  const initRender = (initialRoot: HTMLElement, initialComp: () => string) => {
    root = initialRoot;
    component = initialComp;
    render();
  };
  const render = () => (root.innerHTML = component());
  return { initRender, render };
}

export const { initRender, render } = Renderer();
