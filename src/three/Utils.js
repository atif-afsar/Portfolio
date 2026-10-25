// Shared tiny classes for the 3D office (Sizes, Mouse, Time, EventEmitter).
export class EventEmitter {
  constructor() {
    this.callbacks = { base: {} };
  }
  on(name, cb) {
    (this.callbacks.base[name] ||= []).push(cb);
    return this;
  }
  off(name, cb) {
    const arr = this.callbacks.base[name];
    if (arr) this.callbacks.base[name] = arr.filter((f) => f !== cb);
    return this;
  }
  trigger(name, args = []) {
    for (const cb of this.callbacks.base[name] || []) cb.apply(this, args);
  }
}

export class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this._onResize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.trigger("resize");
    };
    window.addEventListener("resize", this._onResize);
  }
  dispose() {
    window.removeEventListener("resize", this._onResize);
  }
}

export class Mouse extends EventEmitter {
  constructor() {
    super();
    // start centred: touch screens may not move the "mouse" before the first
    // tap, and (0,0) would swing the desk view hard to one side
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.inComputer = false;
    this.on("mousemove", (event) => {
      if (event.clientX && event.clientY) {
        this.x = event.clientX;
        this.y = event.clientY;
      }
      this.inComputer = event.inComputer ? true : false;
    });
  }
}

export class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this._raf = null;
    this._step = () => {
      const now = Date.now();
      this.delta = now - this.current;
      this.current = now;
      this.elapsed = this.current - this.start;
      this.trigger("tick");
      this._raf = requestAnimationFrame(this._step);
    };
    this._raf = requestAnimationFrame(this._step);
  }
  reset() {
    this.start = Date.now();
  }
  dispose() {
    cancelAnimationFrame(this._raf);
  }
}
