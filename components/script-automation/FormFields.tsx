import React from "react";

const FormFields = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          placeholder="052XXXXXXX"
        />
      </div>

      <div>
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Product or Service Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
        />
      </div>

      <div>
        <label
          htmlFor="targetAudience"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Target Audience
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          placeholder="e.g., working professionals, parents, teenagers"
        />
      </div>

      <div>
        <label
          htmlFor="keyBenefits"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Key Benefits or Features
        </label>
        <textarea
          id="keyBenefits"
          name="keyBenefits"
          value={formData.keyBenefits}
          onChange={handleChange}
          required
          rows="3"
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          placeholder="List main benefits or features of your product/service"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="toneOfVoice"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Tone of Voice
          </label>
          <select
            id="toneOfVoice"
            name="toneOfVoice"
            value={formData.toneOfVoice}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="humorous">Humorous</option>
            <option value="dramatic">Dramatic</option>
            <option value="inspirational">Inspirational</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="scriptLength"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Script Length
          </label>
          <select
            id="scriptLength"
            name="scriptLength"
            value={formData.scriptLength}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          >
            <option value="short">Short (15-30 seconds)</option>
            <option value="medium">Medium (30-60 seconds)</option>
            <option value="long">Long (60-90 seconds)</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="callToAction"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Call to Action
        </label>
        <input
          type="text"
          id="callToAction"
          name="callToAction"
          value={formData.callToAction}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-zinc-800/70 border border-zinc-700 rounded-md focus:ring-red-500 focus:border-red-500 text-white"
          placeholder="e.g., Visit our website, Download now, Call today"
        />
      </div>
    </>
  );
};

export default FormFields;
