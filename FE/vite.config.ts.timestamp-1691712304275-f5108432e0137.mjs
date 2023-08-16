// vite.config.ts
import { defineConfig } from "file:///C:/Users/SSAFY/Desktop/study/S09P12D206/FE/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/SSAFY/Desktop/study/S09P12D206/FE/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    // speed up since tests don't rely on css
    // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts#L14-L16
    css: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTU0FGWVxcXFxEZXNrdG9wXFxcXHN0dWR5XFxcXFMwOVAxMkQyMDZcXFxcRkVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFNTQUZZXFxcXERlc2t0b3BcXFxcc3R1ZHlcXFxcUzA5UDEyRDIwNlxcXFxGRVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvU1NBRlkvRGVza3RvcC9zdHVkeS9TMDlQMTJEMjA2L0ZFL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVzdC9jb25maWdcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHRlc3Q6IHtcclxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXHJcbiAgICBzZXR1cEZpbGVzOiBcIi4vc2V0dXBUZXN0cy50c1wiLFxyXG4gICAgLy8gc3BlZWQgdXAgc2luY2UgdGVzdHMgZG9uJ3QgcmVseSBvbiBjc3NcclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdC9ibG9iL21haW4vZXhhbXBsZXMvcmVhY3QtdGVzdGluZy1saWIvdml0ZS5jb25maWcudHMjTDE0LUwxNlxyXG4gICAgY3NzOiBmYWxzZSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VCxTQUFTLG9CQUFvQjtBQUMzVixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxJQUNKLGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQTtBQUFBO0FBQUEsSUFHWixLQUFLO0FBQUEsRUFDUDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
