const pages = {
  Projects: "/",
  ProjectDetail: "/project",
  Admin: "/admin",
};

export function createPageUrl(page) {
  return pages[page] || "/";
}