import { render, screen } from '@testing-library/react';
import Options from '../Options';

describe("test server response for scoops", () => {
  test("display images for each scoop option from server", async () => {
    render(<Options optionType='scoops' />);
    
    // find images
    const scoopImages = await screen.findAllByAltText(/scoop$/i);
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((element) => (element as HTMLImageElement).alt);
    expect(altText).toEqual(["Mint Chip scoop", "Salted Caramel scoop"]);
  });
});
