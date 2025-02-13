export interface RouteConfigInterface {
  displayHeader: boolean;
  buttonAction: {
    type: string;
    link?: string;
  };
  headerTitle?: string;
  headerAddress?: string;
  displayImg?: string;
  displayFooter: boolean;
}
