
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const CreateAdsForm = () => {
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      photo: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      photo: Yup.string().url("Must be a valid URL").required("Photo URL is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/api/adverts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Failed to create advertisement");
        setMessage({ type: "success", text: "Advertisement created successfully!" });
        resetForm();
      } catch (error: any) {
        setMessage({ type: "error", text: error.message });
      }
    },
  });

  return (
    <div className="mx-auto max-w-sm space-y-6 p-6 rounded-lg border bg-white shadow-sm mt-10">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create Advertisement</h1>
        <p className="text-sm text-muted-foreground text-gray-500">
          Fill out the form to create a new advertisement
        </p>
      </div>

      {message && (
        <div
          className={`text-sm p-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...formik.getFieldProps("title")}
            className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
              formik.touched.title && formik.errors.title ? "border-red-500" : "border-input"
            }`}
            placeholder="New sale!"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-sm text-red-500">{formik.errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            type="text"
            {...formik.getFieldProps("description")}
            className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-input"
            }`}
            placeholder="Description of the ad"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-sm text-red-500">{formik.errors.description}</p>
          )}
        </div>

        {/* Photo URL */}
        <div className="space-y-2">
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <input
            id="photo"
            type="text"
            {...formik.getFieldProps("photo")}
            className={`w-full px-3 py-2 text-sm border rounded-md shadow-sm ${
              formik.touched.photo && formik.errors.photo ? "border-red-500" : "border-input"
            }`}
            placeholder="https://example.com/photo.jpg"
          />
          {formik.touched.photo && formik.errors.photo && (
            <p className="text-sm text-red-500">{formik.errors.photo}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Create Advertisement
        </button>
      </form>
    </div>
  );
};

export default CreateAdsForm;