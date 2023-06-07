import { Rating } from "@material-tailwind/react";
import { classNames } from "../Navbar/navbar.utils";

export default function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <div className="bg-white">
      <div>
        <h2 className="sr-only">Customer Reviews</h2>

        <div className="-my-10">
          {reviews.map((review, reviewIdx) => (
            <div
              key={review.id}
              className="flex space-x-4 text-sm text-gray-500"
            >
              <div className="flex-none py-10">
                <img
                  src={"https://api.dicebear.com/6.x/adventurer/svg"}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-100"
                />
              </div>
              <div
                className={classNames(
                  reviewIdx === 0 ? "" : "border-t border-gray-200",
                  "flex-1 py-10"
                )}
              >
                <h3 className="font-medium text-gray-900">
                  {review.reviewer.name}
                </h3>
                <p>
                  <time dateTime={review.createdAt}>{review.createdAt}</time>
                </p>

                <div className="mt-4 flex items-center">
                  <Rating value={4} readonly />
                </div>
                <p className="sr-only">{review.rating} out of 5 stars</p>

                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: review.comment }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
