import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { userStore } from "@/store/useUserStore";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ProfileForm() {
  const { updateProfile, user } = userStore();
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || "",
    password: user?.password || "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProfile(profileData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-2xl font-semibold text-foreground dark:text-foreground">
          Profile Setting
        </h3>
        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
          Edit your profile.
        </p>
        <form onSubmit={updateProfileSubmitHandler} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Label
                htmlFor="first-name"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Fullname
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="fullname"
                value={profileData.fullname}
                name="fullname"
                onChange={changeHandler}
                className="mt-2"
                required
              />
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Email
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={changeHandler}
                autoComplete="email"
                className="mt-2"
                readOnly
              />
            </div>
            
            <div className="col-span-full">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Password
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value="*******"
                className="mt-2"
                readOnly
              />
              
              <div className="mt-4">
                <Link to="/forgot-password">
                  <Button
                    type="button"
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Reset Password
                  </Button>
                </Link>
              </div>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Address
              </Label>
              <Input
                type="text"
                id="address"
                onChange={changeHandler}
                name="address"
                value={profileData.address}
                autoComplete="street-address"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                City
              </Label>
              <Input
                type="text"
                id="city"
                value={profileData.city}
                onChange={changeHandler}
                name="city"
                autoComplete="address-level2"
                className="mt-2"
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <Label
                htmlFor="state"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                State
              </Label>
              <Input
                type="text"
                id="state"
                value={profileData.state}
                onChange={changeHandler}
                name="state"
                autoComplete="address-level1"
                className="mt-2"
              />
            </div>

            <div className="col-span-full sm:col-span-2">
              <Label className="text-sm font-medium text-foreground dark:text-foreground">
                Country
              </Label>
              <Input
                type="text"
                id="country"
                onChange={changeHandler}
                name="country"
                value={profileData.country}
                autoComplete="address-level1"
                className="mt-2"
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="whitespace-nowrap"
            >
              Cancel
            </Button>
            <Button type="submit" className="whitespace-nowrap">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
