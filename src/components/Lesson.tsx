import { Lock, CheckCircle } from 'phosphor-react';
import {isPast, format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps){

    const {slug} = useParams<{slug: string}>();

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' - 'd' de 'MMMM' - 'k'h'mm", {locale: ptBR})

    const isAvailableSlug = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>            
            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isAvailableSlug ? 'bg-green-500' : ''}`}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className={`text-sm font-medium flex items-center gap-2 ${isAvailableSlug ? 'text-write' : 'text-blue-500'}`}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>                        
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em Breve
                        </span>                        
                    )}
                    <span className={`text-xs rounded py-[2px] px-2 text-white border ${isAvailableSlug ? 'border-white' : 'border-green-300'}`}>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRATICA'}
                    </span>
                </header>                    
                <strong className={`mt-5 block ${isAvailableSlug ? 'text-write' : 'text-gray-200'}`}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}