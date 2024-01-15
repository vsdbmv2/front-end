import {computeGlobalAlignment, computeLocalAlignment, epitopeMap} from '@vsdbmv2/mapping-library'

export const process = (work) => {
  if(work.type === 'local-mapping') return computeLocalAlignment(work.sequence1, work.sequence2);
  if(work.type === 'global-mapping') return computeGlobalAlignment(work.sequence1, work.sequence2, work.id2)
  if(work.type === 'epitope-mapping') return epitopeMap(work.sequence1, work.sequence2);
}

export default process;