"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectField from "@/components/form/select.form";
import { useEffect, useState } from "react";
import AxiosInstance from "@/services/api-calls/axios.instance";
type dataProps = {
  name: string;
  company: string;
  fuel: string;
  transmission: string;
  owner: string;
  seller_type: string;
  year: number;
  km_driven: number;
};

export default function Component() {
  const [isLoading, setIsLoading] = useState(true);
  const [carNames, setCarNames] = useState([]);
  const [companyNames, setCompanyNames] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [ownerType, setOwnerType] = useState([]);
  const [sellerTypes, setSellerTypes] = useState([]);
  const [transmissionType, setTransmissionType] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState<any>("");

  const [data, setData] = useState<dataProps>({
    name: "",
    company: "",
    fuel: "",
    year: 0,
    km_driven: 0,
    transmission: "",
    owner: "",
    seller_type: "",
  });

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      let data: any = await AxiosInstance.get("/car");

      setCarNames(data.car_names);
      setCompanyNames(data.company_names);
      setFuelTypes(data.fuel);
      setOwnerType(data.owner);
      setSellerTypes(data.seller_type);
      setTransmissionType(data.transmission);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const submitHandler = async (event: any) => {
    try {
      event.preventDefault();
      console.log(data);

      let serverProps = {
        name: [data.name],
        company: [data.company],
        year: [data.year],
        km_driven: [data.km_driven],
        fuel: [data.fuel],
        transmission: [data.transmission],
        owner: [data.owner],
        seller_type: [data.seller_type],
      };

      let res: any = await AxiosInstance.post("/car", serverProps);
      console.log(res);
      setPredictedPrice(res.predicted_price);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-100 py-12 sm:px-6">
        <div className="mx-2 sm:container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-8">Predict Your Car's Price</h2>

          {isLoading == false ? (
            <>
              <form
                className="bg-white shadow-md rounded px-2 pt-2 sm:px-8 sm:pt-6 pb-8 mb-4"
                onSubmit={submitHandler}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <SelectField
                    label="Car name"
                    placeholder="Select car name"
                    options={carNames}
                    handleChange={(value) =>
                      setData({ ...data, ...{ name: value } })
                    }
                  />

                  <SelectField
                    label="Company"
                    placeholder="Select company name"
                    options={companyNames}
                    handleChange={(value) =>
                      setData({ ...data, ...{ company: value } })
                    }
                  />

                  <div className="">
                    <label
                      htmlFor="year"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Year
                    </label>
                    <Input
                      id="year"
                      type="number"
                      min={1995}
                      max={2024}
                      placeholder="e.g., 2015"
                      onChange={(event) => {
                        setData({
                          ...data,
                          ...{ year: Number(event.target.value) },
                        });
                      }}
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="mileage"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Kilometer Driven
                    </label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="e.g., 50,000"
                      onChange={(event) => {
                        setData({
                          ...data,
                          ...{ km_driven: Number(event.target.value) },
                        });
                      }}
                    />
                  </div>

                  <SelectField
                    label="Fuel Type"
                    placeholder="Select fuel type"
                    options={fuelTypes}
                    handleChange={(value) =>
                      setData({ ...data, ...{ fuel: value } })
                    }
                  />

                  <SelectField
                    label="Transmission"
                    placeholder="Select transmission type"
                    options={transmissionType}
                    handleChange={(value) =>
                      setData({ ...data, ...{ transmission: value } })
                    }
                  />

                  <SelectField
                    label="Owner type"
                    placeholder="Select owner type"
                    options={ownerType}
                    handleChange={(value) =>
                      setData({ ...data, ...{ owner: value } })
                    }
                  />

                  <SelectField
                    label="Seller type"
                    placeholder="Select seller type"
                    options={sellerTypes}
                    handleChange={(value) =>
                      setData({ ...data, ...{ seller_type: value } })
                    }
                  />
                </div>
                <div className="flex items-center justify-between pt-2 mt-4">
                  <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Predict Price
                  </Button>
                </div>
              </form>
            </>
          ) : null}
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="text-2xl font-bold mb-4">Predicted Price</h3>
            <div className="text-4xl font-bold mb-2">{predictedPrice}</div>
            <p className="text-gray-700 mb-4">
              Based on the information you provided, the predicted price for
              your car is {predictedPrice}. This estimate takes into account the
              car's make, model, year, mileage, fuel type, transmission, and
              previous ownership history.
            </p>
            <p className="text-gray-700 mb-4">
              Please note that this is an estimate and the actual selling price
              may vary depending on market conditions, negotiation, and other
              factors. We recommend researching similar listings in your area to
              get a better sense of the current market value.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
