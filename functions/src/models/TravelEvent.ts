interface Image {
  url: string;
}

export default interface TravelEvent {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
}
