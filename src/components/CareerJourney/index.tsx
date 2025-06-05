'use client'

import { BriefcaseBusinessIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const CareerJourney: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <Button className="rounded-full w-fit" variant="outline">
        <BriefcaseBusinessIcon className="size-6" />
        Get career path recommendations
      </Button>
      <div>
        <div className="flex items-center gap-2 font-semibold my-2">
          <BriefcaseBusinessIcon className="size-4" />
          Career Path Recommendations
        </div>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">Software Engineer</AccordionTrigger>
            <AccordionContent>
              A software engineer is a professional who applies engineering principles to the
              design, development, maintenance, testing, and evaluation of software and systems that
              make computers or anything containing software, such as chips, work.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              Artificial Intelligence Engineer
            </AccordionTrigger>
            <AccordionContent>
              An Artificial Intelligence engineer is a professional who develops, manages, and
              trains AI models and systems. They work with machine learning algorithms, neural
              networks, and other AI technologies to create intelligent applications that can learn
              from data and make decisions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-0">
            <AccordionTrigger className="hover:no-underline">
              Operating System Kernel Developer
            </AccordionTrigger>
            <AccordionContent>
              An Operating System kernel developer is a software engineer who specializes in
              developing and maintaining the core component of an operating system, known as the
              kernel. The kernel is responsible for managing system resources, such as memory, CPU,
              and I/O devices, and providing a bridge between hardware and software.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
