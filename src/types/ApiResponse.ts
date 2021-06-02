export default interface ApiResponse {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  release_dates: [{ id: number; y: number }];
  name: string;
  platforms: [
    {
      id: number;
      name: string;
    }
  ];
  summary: string;
}
