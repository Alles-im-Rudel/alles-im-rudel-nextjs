import React, { useRef, useState } from "react";
import tw from "twin.macro";
import iUser from "../../../../Interfaces/iUser";
import useProfilStore from "../../../../lib/Profil/store";
import { shallow } from "zustand/shallow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons/faCameraRetro";
import { RotateFontAwesomeIcon } from "../../../Button";

const Wrapper = tw.div`
  relative
  h-52
  w-52
`;

const Image = tw.img`
  rounded-full
  object-center
  object-cover
  w-full
  h-full
  drop-shadow-xl
`;

const Button = tw.button`
  absolute
  w-10
  h-10
  right-smallest
  bottom-smallest
  bg-white
  p-smallest
  rounded-full
  hover:bg-secondary
  drop-shadow-md
`;

const FileInput = tw.input`
  hidden
`;

interface iProfileImg {
  user: iUser;
}
const ProfileImg = ({ user }: iProfileImg) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, updateImage] = useProfilStore(
    (state) => [state.loading, state.updateImage],
    shallow
  );

  const [image, setImage] = useState(user?.image?.image);
  const handleClick = () => {
    inputRef?.current?.click();
  };
  const onChangeFile = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      updateImage(file);
    } else {
      setImage(user?.image?.image);
    }
  };
  return (
    <div>
      <Wrapper>
        {user?.thumbnail?.thumbnail && (
          <Image src={image} alt={user.fullName} />
        )}
        <Button onClick={handleClick}>
          {loading ? (
            <RotateFontAwesomeIcon icon={faSpinner} />
          ) : (
            <FontAwesomeIcon icon={faCameraRetro} />
          )}
        </Button>
        <FileInput
          type="file"
          ref={inputRef}
          placeholder="Image"
          name="image"
          onChange={onChangeFile}
        />
      </Wrapper>
    </div>
  );
};

export default ProfileImg;
