import React from 'react';
import upload from '../assets/uploadImg.png';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { db, storage } from '../firebaseServices'; // Import Firestore and Storage services
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const HomePage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm();

  // Handle file upload to Firebase Storage
  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Handle upload progress here
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      let imageUrl = '';
      const file = getValues('file')[0]; // Get the file from the form input
      if (file) {
        imageUrl = await handleFileUpload(file);
      }

      await addDoc(collection(db, 'users'), {
        ...data,
        profileImage: imageUrl // Add the uploaded image URL here
      });

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to submit form.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-center mb-4">Match making Submission Form</h1>
      
      {/* Divider Line */}
      <hr className="mt-16" />

      {/* Personal Details Section */}
      <div className="flex justify-center mb-3">
        <h2 className="text-2xl font-bold mt-6 mb-2 mr-0 lg: text-center lg:text-left">Personal Details</h2>
      </div>
      
      {/* Divider Line */}
      <hr className="mb-8 w-full" />

        {/* Image Upload Box */}
        <div className="flex justify-start mb-4 mt-4">
        <div className="rounded-lg p-8 text-center w-full lg:w-1/2">
          {/* Wrapping the image in a label to make it clickable */}
          <label htmlFor="file-upload" className="cursor-pointer">
            <img src={upload} alt="Upload" className="mx-auto mb-4" />
          </label>
          <input type="file" className="hidden" id="file-upload" {...register('file')} />
        </div>
      </div>

      {/* Form Sections */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name and Display Name Fields */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
          {/* Name Field */}
          <div className="flex-1">
            <label htmlFor="name" className="block text-lg font-semibold mb-2 flex items-center">
              <span>Name</span>
              <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
            </label>
            <input 
              type="text" 
              id="name" 
              {...register('name', { required: 'Name is required' })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your name" 
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Display Name Field */}
          <div className="flex-1">
            <label htmlFor="display-name" className="block text-lg font-semibold mb-2 flex items-center">
              <span>Display Name</span>
              <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
            </label>
            <input 
              type="text" 
              id="display-name" 
              {...register('displayName', { required: 'Display Name is required' })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your display name" 
            />
            {errors.displayName && <p className="text-red-500">{errors.displayName.message}</p>}
          </div>
        </div>

      {/* Age and Email Fields */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
          {/* Age Field */}
          <div className="flex-1">
            <label htmlFor="age" className="block text-lg font-semibold mb-2 flex items-center">
              <span>Age</span>
              <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
            </label>
            <input 
              type="number" 
              id="age" 
              {...register('age', { 
                required: 'Age is required', 
                min: { value: 1, message: 'Age must be greater than 0' },
                max: { value: 120, message: 'Age must be less than 120' } 
              })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your age" 
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          {/* Email Field */}
          <div className="flex-1">
            <label htmlFor="email" className="block text-lg font-semibold mb-2 flex items-center">
              <span>Email</span>
              <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
            </label>
            <input 
              type="email" 
              id="email" 
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
        </div>

      {/* Height and Religion Fields */}
<div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
  {/* Height Field */}
  <div className="flex-1">
    <label htmlFor="height" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Height (cm)</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <input 
      type="number" 
      id="height" 
      {...register('height', { 
        required: 'Height is required',
        min: { value: 50, message: 'Height must be at least 50 cm' },
        max: { value: 300, message: 'Height must be less than 300 cm' },
      })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter your height in cm" 
    />
    {errors.height && <p className="text-red-500">{errors.height.message}</p>}
  </div>

  {/* Religion Field */}
  <div className="flex-1">
    <label htmlFor="religion" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Religion</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="religion" 
      {...register('religion', { required: 'Religion is required' })}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select your religion</option>
      <option value="Christianity">Christianity</option>
      <option value="Islam">Islam</option>
      <option value="Hinduism">Hinduism</option>
      <option value="Buddhism">Buddhism</option>
      <option value="Atheism">Atheism</option>
    </select>
    {errors.religion && <p className="text-red-500">{errors.religion.message}</p>}
  </div>
</div>

      {/* Employment Status and Tech Stack Fields */}
<div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
  {/* Employment Status Field */}
  <div className="flex-1">
    <label htmlFor="employment-status" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Employment Status</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="employment-status" 
      {...register('employmentStatus', { required: 'Employment status is required' })}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select your employment status</option>
      <option value="Employed">Employed</option>
      <option value="Self-employed">Self-employed</option>
      <option value="Business owner">Business owner</option>
      <option value="Unemployed">Unemployed</option>
      <option value="Student">Student</option>
    </select>
    {errors.employmentStatus && <p className="text-red-500">{errors.employmentStatus.message}</p>}
  </div>

  {/* Tech Stack Field */}
  <div className="flex-1">
    <label htmlFor="tech-stack" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Tech Stack</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <input 
      type="text" 
      id="tech-stack" 
      {...register('techStack', { 
        required: 'Tech stack is required', 
        maxLength: { value: 100, message: 'Tech stack must be less than 100 characters' },
      })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter your tech stack" 
    />
    {errors.techStack && <p className="text-red-500">{errors.techStack.message}</p>}
  </div>
</div>


      {/* Genotype and Gender Fields */}
<div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
  {/* Genotype Field */}
  <div className="flex-1">
    <label htmlFor="genotype" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Genotype</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <input 
      type="text" 
      id="genotype" 
      {...register('genotype', { 
        required: 'Genotype is required', 
        pattern: {
          value: /^(AA|AS|SS|AC|SC)$/,
          message: 'Enter a valid genotype (AA, AS, SS, AC, SC)',
        },
      })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter your genotype" 
    />
    {errors.genotype && <p className="text-red-500">{errors.genotype.message}</p>}
  </div>

  {/* Gender Field */}
  <div className="flex-1">
    <label htmlFor="gender" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Your Gender</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="gender" 
      {...register('gender', { required: 'Gender is required' })}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select your gender</option>
      <option value="Man">Man</option>
      <option value="Woman">Woman</option>
    </select>
    {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
  </div>
</div>


       {/* Location and Dating Status Fields */}
  <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
    {/* Location Field */}
    <div className="flex-1">
      <label htmlFor="location" className="block text-lg font-semibold mb-2 flex items-center">
        <span>Location</span>
        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
      </label>
      <input 
        type="text" 
        id="location" 
        {...register('location', { required: 'Location is required' })} 
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Enter your location" 
      />
      {errors.location && <p className="text-red-500">{errors.location.message}</p>}
    </div>

    {/* Dating Status Field */}
    <div className="flex-1">
      <label htmlFor="dating-status" className="block text-lg font-semibold mb-2 flex items-center">
        <span>Dating Status</span>
        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
      </label>
      <select 
        id="dating-status" 
        {...register('datingStatus', { required: 'Dating status is required' })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your dating status</option>
        <option value="Single">Single</option>
        <option value="In a relationship">In a relationship</option>
        <option value="It's complicated">It's complicated</option>
      </select>
      {errors.datingStatus && <p className="text-red-500">{errors.datingStatus.message}</p>}
    </div>
  </div>



{/* Kids and Describe Yourself Fields */}
{/* Kids Checkbox */}
{/* Existing Kids Checkbox */}
<div className="mb-8 lg:mx-48">
        <label htmlFor="kids" className="flex items-center">
          <input
            type="checkbox"
            id="kids"
            {...register('kids')}
            className="mr-2 h-5 w-5"
          />
          <span className="text-lg">Don't mind if the other person has kids</span>
        </label>
      </div>

      {/* Existing Looking For Field */}
        {/* Describe Yourself Field */}
        <div className="mb-8 lg:mx-48">
          <label htmlFor="description" className="block text-lg font-semibold mb-2 flex items-center">
            <span>Describe Yourself</span>
            <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
          </label>
          <textarea 
            id="description" 
            {...register('description', { required: 'Description is required' })} 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows="4" 
            placeholder="Describe what you're looking for in a partner"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>



{/* Preferences Section */}
<hr className="mt-16 mb-4" />
<h2 className="text-2xl font-bold mt-7 mb-4 text-center">Preferences</h2>
<hr className="mb-8 w-full" />

  {/* Preferred Gender and Preferred Location Fields */}
  <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
    {/* Preferred Gender Field */}
    <div className="flex-1">
      <label htmlFor="preferred-gender" className="block text-lg font-semibold mb-2 flex items-center">
        <span>Preferred Gender</span>
        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
      </label>
      <select 
        id="preferred-gender" 
        {...register('preferredGender', { required: 'Preferred gender is required' })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your preferred gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
        <option value="No preference">No preference</option>
      </select>
      {errors.preferredGender && <p className="text-red-500">{errors.preferredGender.message}</p>}
    </div>

    {/* Preferred Location Field */}
    <div className="flex-1">
      <label htmlFor="preferred-location" className="block text-lg font-semibold mb-2 flex items-center">
        <span>Preferred Location</span>
        <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
      </label>
      <input 
        type="text" 
        id="preferred-location" 
        {...register('preferredLocation', { required: 'Preferred location is required' })} 
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Enter preferred location" 
      />
      {errors.preferredLocation && <p className="text-red-500">{errors.preferredLocation.message}</p>}
    </div>
  </div>


{/* Religion and Zodiac Sign Fields */}
<div className="flex flex-col lg:flex-row gap-6 mb-4 lg:mx-48">
  {/* Preferred Religion Field */}
  <div className="flex-1 mb-6">
    <label htmlFor="preferred-religion" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Preferred Religion</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="preferred-religion" 
      {...register('preferredReligion', { required: 'Preferred religion is required' })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select preferred religion</option>
      <option value="Christianity">Christianity</option>
      <option value="Islam">Islam</option>
      <option value="Hinduism">Hinduism</option>
      <option value="Buddhism">Buddhism</option>
      <option value="Atheism">Atheism</option>
    </select>
    {errors.preferredReligion && <p className="text-red-500">{errors.preferredReligion.message}</p>}
  </div>

  {/* Preferred Zodiac Sign Field */}
  <div className="flex-1 mb-6">
    <label htmlFor="preferred-zodiac-sign" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Preferred Zodiac Sign</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="preferred-zodiac-sign" 
      {...register('preferredZodiacSign', { required: 'Preferred zodiac sign is required' })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select preferred zodiac sign</option>
      <option value="Aries">Aries</option>
      <option value="Taurus">Taurus</option>
      <option value="Gemini">Gemini</option>
      <option value="Cancer">Cancer</option>
      <option value="Leo">Leo</option>
      <option value="Virgo">Virgo</option>
      <option value="Libra">Libra</option>
      <option value="Scorpio">Scorpio</option>
      <option value="Sagittarius">Sagittarius</option>
      <option value="Capricorn">Capricorn</option>
      <option value="Aquarius">Aquarius</option>
      <option value="Pisces">Pisces</option>
    </select>
    {errors.preferredZodiacSign && <p className="text-red-500">{errors.preferredZodiacSign.message}</p>}
  </div>
</div>


{/* Personality and Dating Status Fields */}
<div className="flex flex-col lg:flex-row gap-6 mb-4 lg:mx-48">
  {/* Preferred Personality Field */}
  <div className="flex-1 mb-6">
    <label htmlFor="preferred-personality" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Preferred Personality</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="preferred-personality" 
      {...register('preferredPersonality', { required: 'Preferred personality is required' })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select preferred personality</option>
      <option value="Introvert">Introvert</option>
      <option value="Extrovert">Extrovert</option>
      <option value="Ambivert">Ambivert</option>
    </select>
    {errors.preferredPersonality && <p className="text-red-500">{errors.preferredPersonality.message}</p>}
  </div>

  {/* Preferred Dating Status Field */}
  <div className="flex-1 mb-6">
    <label htmlFor="preferred-dating-status" className="block text-lg font-semibold mb-2 flex items-center">
      <span>Preferred Dating Status</span>
      <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
    </label>
    <select 
      id="preferred-dating-status" 
      {...register('preferredDatingStatus', { required: 'Preferred dating status is required' })} 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select preferred dating status</option>
      <option value="Single and Searching">Single and Searching</option>
      <option value="Dating but Searching">Dating but Searching</option>
      <option value="Seeing multiple partners at a time">Seeing multiple partners at a time</option>
      <option value="None of the above">None of the above</option>
    </select>
    {errors.preferredDatingStatus && <p className="text-red-500">{errors.preferredDatingStatus.message}</p>}
  </div>
</div>


       {/* Age Range Fields */}
       <div className="flex flex-col lg:flex-row gap-4 mb-8 lg:mx-48">
          {/* Min Age Field */}
          <div className="flex-1">
            <label htmlFor="minAge" className="block text-lg font-semibold mb-2 flex items-center">
              <span>Minimum Age</span>
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input 
              type="number" 
              id="minAge" 
              {...register('minAge', { 
                required: 'Minimum age is required',
                min: { value: 1, message: 'Minimum age must be greater than 0' },
              })} 
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter minimum age" 
            />
            {errors.minAge && <p className="text-red-500">{errors.minAge.message}</p>}
          </div>

           {/* Max Age Field */}
        <div className="flex-1">
          <label htmlFor="maxAge" className="block text-lg font-semibold mb-2 flex items-center">
            <span>Maximum Age</span>
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input 
            type="number" 
            id="maxAge" 
            {...register('maxAge', { 
              required: 'Maximum age is required',
              min: { value: 1, message: 'Maximum age must be greater than 0' },
              validate: {
                maxAgeIsGreaterThanMinAge: () => {
                  const minAgeValue = Number(getValues('minAge'));
                  const maxAgeValue = Number(getValues('maxAge'));
                  return maxAgeValue > minAgeValue || 'Maximum age must be greater than minimum age';
                },
              },
            })} 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter maximum age" 
          />
          {errors.maxAge && <p className="text-red-500">{errors.maxAge.message}</p>}
        </div>

        </div>

          {/* New Kids Checkbox */}
      <div className="mb-8 lg:mx-48">
        <label htmlFor="prefersKids" className="flex items-center">
          <input
            type="checkbox"
            id="prefersKids"
            {...register('prefersKids')}
            className="mr-2 h-5 w-5"
          />
          <span className="text-lg">Don't mind if the other person has kids</span>
        </label>
      </div>

      {/* New Looking For Field */}
      <div className="mb-8 lg:mx-48">
        <label htmlFor="looking-for-partner" className="block text-lg font-semibold mb-2 flex items-center">
          <span>What are you looking for in a partner?</span>
          <span className="text-red-500 ml-1">*</span> {/* Red asterisk */}
        </label>
        <textarea
          id="looking-for-partner"
          {...register('lookingForInPartner', { required: 'This field is required' })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Describe what you're looking for in a partner"
        ></textarea>
        {errors.lookingForInPartner && <p className="text-red-500">{errors.lookingForInPartner.message}</p>}
      </div>




     {/* Submit Button */}
     <div className="text-center mb-4">
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        </form>
 {/* Footer Component */}
 <Footer />{Footer}
    


      </div>
      
  );
};



export default HomePage;
