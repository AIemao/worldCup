/**
 * Tipos de handles de rota — usados para metadados por rota
 * (breadcrumbs, título de página, visibilidade no nav, etc.)
 */
export type RouteHandle = {
  title?: string;
  breadcrumb?: string;
  showInNav?: boolean;
};
