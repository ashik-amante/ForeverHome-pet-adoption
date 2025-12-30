import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import pet from "../../assets/banner.jpg";

const Banner = () => {
    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground mb-4 w-fit">
                            <Heart className="mr-1 h-4 w-4 fill-current" />
                            Give a Loving Home to a Pet in Need
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            Your New Best Friend is Waiting for You
                        </h1>
                        <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
                            Join our mission to unite pets with their forever families. Browse our listings and find the perfect companion today.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" className="px-8">
                                Adopt Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg">
                                View Campaigns
                            </Button>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            alt="Happy pet adoption"
                            className="relative mx-auto aspect-video overflow-hidden rounded-2xl object-cover object-center sm:w-full lg:order-last"
                            src={pet}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;