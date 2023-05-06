import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { InputNames } from "../../common/interfaces/commonInterfaces";

export default function EditProfile() {
  return (
    <div className="w-[750px] p-8 shadow-sm rounded-sm">
      <span className="action-title font-semibold text-xl">Edit Profile</span>
      <div className="user-pic mt-5 flex items-center gap-10">
        <img
          src="https://api.dicebear.com/6.x/adventurer/svg"
          alt="profile picture"
          className="w-32 h-32 rounded-full object-cover"
        />
        <span>Upload Photo</span>
      </div>
      <div className="form flex flex-col gap-8">
        {/* <Input
          type="text"
          name={InputNames.name}
          label="Full Name"
          // errors={errors[InputNames.name]}
          // onChange={handleChange}
          // value={values.name}
        />
        <Input
          type="text"
          name={InputNames.name}
          label="Location"
          // errors={errors[InputNames.name]}
          // onChange={handleChange}
          // value={values.name}
        />
        <Input
          type="text"
          name={InputNames.name}
          label="Phone Number"
          // errors={errors[InputNames.name]}
          // onChange={handleChange}
          // value={values.name}
        /> */}
      </div>
      <Button
        title="Save Changes"
        twClassName="bg-primary hover:bg-primaryHover mt-8 w-[150px] font-urban-medium"
      />
    </div>
  );
}
