interface AssociatedVehicle {
  ez: string;
  fuelType: number;
  transmission: number;
  mileageInKm: number;
}

export interface AuctionItem {
  remainingTimeInSeconds: number;
  currentHighestBidValueNet: number;
  amIHighestBidder: boolean;
  associatedVehicle: AssociatedVehicle;
  formattedTime?: string;
}

export interface AuctionResponse {
  items: AuctionItem[];
  page: number;
  total: number;
}
