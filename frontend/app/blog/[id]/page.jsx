'use client';

import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      _id
      title
      content
      author
    }
  }
`;

export default function PostPage() {
  const params = useParams();
  const { id } = params;
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  if (loading) return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-10 bg-amber-200 rounded w-3/4 mb-6"></div>
        <div className="h-6 bg-amber-100 rounded w-1/3 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-amber-100 rounded w-full"></div>
          <div className="h-4 bg-amber-100 rounded w-5/6"></div>
          <div className="h-4 bg-amber-100 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-amber-50 p-8 flex items-center justify-center">
      <div className="bg-red-100 p-6 rounded-lg max-w-md text-center">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Error loading post</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 border-b border-amber-200 pb-8">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-4">
            {data.post.title}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-stone-600">Written by</span>
            <span className="font-medium text-amber-700">{data.post.author}</span>
          </div>
        </header>

        <article className="prose lg:prose-xl max-w-none bg-white rounded-lg shadow-lg p-8">
          <div className="text-stone-700 leading-relaxed font-serif">
            {data.post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-12 text-center">
          <a 
            href="/blog" 
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium transition-colors"
          >
            ← Back to all posts
          </a>
        </div>
      </div>
    </div>
  );
}
