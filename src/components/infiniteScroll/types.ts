export interface PaginationTypes {
  pageNumber: number,
  pageSize: number,
  totalPages: number,
}

export type Props = {
  onRefresh?: () => void;
  loadMore?: () => void;
  renderItem: (item: any, index: number) => any;
  getData: (search: PaginationTypes) => Promise<ResponseTypes>;
  hasMore?: boolean;
  threshold?: number;
  pageSize?: number;
  refreshComponent?: JSX.Element;
  noDataComponent?: JSX.Element;
  hasMoreComponent?: JSX.Element;
  loadingMoreComponent?: JSX.Element;
  noMoreComponent?: JSX.Element;
  children?: JSX.Element;
  customStyle?: string | object;
};

export interface ResponseTypes extends PaginationTypes {
  content: any,
}