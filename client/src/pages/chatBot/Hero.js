import React from 'react'

export default function ChatHero() {
  return (
    <section class="bg-white dark:bg-[#1f2937] mb-10">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div class="max-w-screen-md mb-8 lg:mb-16 mx-auto text-center">
        <h2 class="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Try Asking Questions like these !</h2>
    </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
              <p class="text-gray-500 dark:text-gray-400">What are my expenses. Where am I spending the most? How can I decrease my expense. Where should I spend less?</p>
          </div>
          <div>
              <p class="text-gray-500 dark:text-gray-400">My goal is to buy a car, based on my current financial condition, suggest me ways such that I can plan to buy it.</p>
          </div>
          <div>
              <p class="text-gray-500 dark:text-gray-400">Based on my current financial condition, what is the best financial path I can follow, so that I can live a better life.</p>
          </div>
      </div>
  </div>
</section>
  )
}
