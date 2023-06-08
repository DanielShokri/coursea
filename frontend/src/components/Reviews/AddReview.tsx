import CommonButton from "../../common/Button/Button";
import { displayToast } from "../../common/Notfications/Notfications";
import { useBoundStore } from "../../store/store";

export default function AddReview({ isAddReview, setIsAddReview }: any) {
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const handleAddReview = (e: any) => {
    e.preventDefault();
    if (!isLoggedIn) {
      displayToast({ type: "error", message: "Please login to add review" });
      return;
    }
  };

  return (
    <>
      {!isAddReview ? (
        <CommonButton
          onClick={() => setIsAddReview(!isAddReview)}
          title="Add Review"
          twClassName="bg-primary hover:bg-primaryHover ml-auto mt-8 font-urban-medium"
          outerTwClassnames="w-[120px] ml-auto"
        />
      ) : (
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <form className="relative">
              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  className="block w-full resize-none border-0 py-3 p-3 sm:text-sm focus-visible:outline-none"
                  placeholder="Add your comment..."
                  defaultValue={""}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div className="py-2" aria-hidden="true">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 justify-end bottom-0 flex gap-2 py-2 pl-3 pr-2">
                <div className="flex items-center space-x-5"></div>
                <div>
                  <CommonButton
                    title="Cancel"
                    onClick={() => setIsAddReview(false)}
                    twClassName="bg-secondary-red mt-8 h-8 font-semibold text-white"
                  />
                </div>
                <div>
                  <CommonButton
                    onClick={handleAddReview}
                    title="Post"
                    twClassName="bg-primary h-8 hover:bg-primaryHover mt-8 font-semibold "
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
