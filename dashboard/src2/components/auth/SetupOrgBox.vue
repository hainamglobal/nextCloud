<template>
	<div class="relative flex flex-col justify-center min-h-screen bg-[#f8fafc] py-10">
		<div class="relative z-10 mx-auto w-full px-4 sm:px-6">
			<div class="flex flex-col mb-6" @dblclick="redirectForFrappeioAuth">
				<slot name="logo"> 
					<div class="flex flex-col items-center"> 
						<div class="flex flex-col items-center">  
							<HNTLogo class="inline-block h-[44px] w-auto object-contain" />
						</div> 
					</div>
				</slot>
			</div>
			<div class="mx-auto w-full bg-white px-6 py-8 sm:px-10 sm:py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 max-w-2xl rounded-2xl">
				<div class="mb-6 text-center" v-if="title">
					<h2 class="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800">
							{{ title }}  
					</h2> 
				</div>
				<!-- <p
					class="mb-6 break-words text-base font-normal leading-[21px] text-gray-700"
					v-if="subtitle"
				>
					{{ subtitle }}  
				</p> -->
				<slot></slot>
			</div>
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
import { toast } from 'vue-sonner';
import FCLogo from '@/components/icons/FCLogo.vue';
import HNTLogo from '@/components/icons/HNTLogo.vue';
export default {
	name: 'LoginBox',
	props: ['title', 'logo', 'subtitle'],
	components: {
		FCLogo,HNTLogo,
	},
	mounted() {
		const params = new URLSearchParams(window.location.search);

		if (params.get('showRemoteLoginError')) {
			toast.error('Token Invalid or Expired');
		}
	},
	methods: {
		redirectForFrappeioAuth() {
			window.location = '/f-login';
		},
	},
};
</script>
